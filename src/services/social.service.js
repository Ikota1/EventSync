import { get, set, ref, update } from 'firebase/database';
import { db } from "../firebase/firebase-config";

export const sendFriendRequest = async (senderID, recipientID) => {

    try {
        console.log('Executing sendFriendRequest function');
        const senderRef = ref(db, `users/${senderID}`);
        const recipientRef = ref(db, `users/${recipientID}`);

        const senderSnapshot = await get(senderRef);
        const recipientSnapshot = await get(recipientRef);

        const senderData = senderSnapshot.val();
        const recipientData = recipientSnapshot.val();

        if(senderData && recipientData) {
            const outGoingReqsArray = senderData.outGoingFriendRequests || [];
            outGoingReqsArray.push(recipientID)
            const incomingReqsArray = recipientData.incomingFriendRequests || [];
            incomingReqsArray.push(senderID)
            
            const updatedSenderData = { ...senderData, outGoingFriendRequests: outGoingReqsArray };
            const updatedRecipientData = { ...recipientData, incomingFriendRequests: incomingReqsArray };
            
            await set(senderRef, updatedSenderData);
            await set(recipientRef, updatedRecipientData);
            
        }

    } catch (error) {
        console.error('Error in sendFriendRequest:', error);
    }

}


export const acceptFriendRequest = async (senderID, recipientID) => {
    try {
        console.log('Executing acceptFriend function');
        
        const senderRef = ref(db, `users/${senderID}`);
        const recipientRef = ref(db, `users/${recipientID}`);

        const senderSnapshot = await get(senderRef);
        const recipientSnapshot = await get(recipientRef);

        const senderData = senderSnapshot.val();
        const recipientData = recipientSnapshot.val();

        if (senderSnapshot.exists() && recipientSnapshot.exists()) {

        const updatedSenderOutgoing = (senderData.outGoingFriendRequests || []).filter(request => request !== recipientID);
        const updatedRecipientIncoming = (recipientData.incomingFriendRequests || []).filter(request => request !== senderID);

        const updatedSenderFriends = {...(senderData.friends || {}), [recipientID]: true };
        const updatedRecipientFriends = {...(recipientData.friends || {}), [senderID]: true };

        const updateObj = {};
        updateObj[`users/${senderID}/outGoingFriendRequests`] = updatedSenderOutgoing;
        updateObj[`users/${recipientID}/incomingFriendRequests`] = updatedRecipientIncoming;
        updateObj[`users/${senderID}/friends`] = updatedSenderFriends;
        updateObj[`users/${recipientID}/friends`] = updatedRecipientFriends;

        await update(ref(db), updateObj);

        }
    } catch (error) {
        console.error('Error in acceptFriendRequest:', error);
    }
}

export const rejectFriendRequest = async (recipientID, senderID) => {
    try {
        const recipientRef = ref(db, `users/${recipientID}`);
        const recipientSnapshot = await get(recipientRef);
        const recipientData = recipientSnapshot.val();

        if (recipientSnapshot.exists()) {
            const incomingFriendRequests = recipientData.incomingFriendRequests || [];

            console.log('Incoming Friend Requests:', incomingFriendRequests);

            const updatedRecipientIncoming = incomingFriendRequests.filter(request => request !== senderID);

            console.log('Updated Incoming Friend Requests:', updatedRecipientIncoming);

            const updateObj = {};
            updateObj[`users/${recipientID}/incomingFriendRequests`] = updatedRecipientIncoming;

            await update(ref(db), updateObj);
        }
    } catch (error) {
        console.error('Error in rejectFriendRequest:', error);
    }
};
