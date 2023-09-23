import { get, set, ref, update } from 'firebase/database';
import { db } from "../firebase/firebase-config";

export const sendFriendRequest = async (senderID, recipientID) => {

    try {
        const senderRef = ref(db, `users/${senderID}`);
        const recipientRef = ref(db, `users/${recipientID}`);

        const senderSnapshot = await get(senderRef);
        const recipientSnapshot = await get(recipientRef);

        const senderData = senderSnapshot.val();
        const recipientData = recipientSnapshot.val();

        if (senderData && recipientData) {
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

        const senderRef = ref(db, `users/${senderID}`);
        const recipientRef = ref(db, `users/${recipientID}`);

        const senderSnapshot = await get(senderRef);
        const recipientSnapshot = await get(recipientRef);

        const senderData = senderSnapshot.val();
        const recipientData = recipientSnapshot.val();

        if (senderSnapshot.exists() && recipientSnapshot.exists()) {

            const updatedSenderOutgoing = (senderData.outGoingFriendRequests || []).filter(request => request !== recipientID);
            const updatedRecipientIncoming = (recipientData.incomingFriendRequests || []).filter(request => request !== senderID);

            const updatedSenderFriends = { ...(senderData.friends || {}), [recipientID]: true };
            const updatedRecipientFriends = { ...(recipientData.friends || {}), [senderID]: true };

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
            const updatedRecipientIncoming = incomingFriendRequests.filter(request => request !== senderID);
            const updateObj = {};

            updateObj[`users/${recipientID}/incomingFriendRequests`] = updatedRecipientIncoming;

            await update(ref(db), updateObj);
        }
    } catch (error) {
        console.error('Error in rejectFriendRequest:', error);
    }
};


export const deleteFriend = async (currentUserID, friendToDelete) => {
    try {
        const currentUserRef = ref(db, `users/${currentUserID}`);
        const userToDeleteRef = ref(db, `users/${friendToDelete}`);

        const currentUserSnapshot = await get(currentUserRef);
        const userToDeleteSnapshot = await get(userToDeleteRef);

        const currentUserData = currentUserSnapshot.val();
        const userToDeleteData = userToDeleteSnapshot.val();

        if (currentUserSnapshot.exists() && userToDeleteSnapshot.exists()) {

            if (
                currentUserData.friends &&
                userToDeleteData.friends &&
                currentUserData.friends[friendToDelete] &&
                userToDeleteData.friends[currentUserID]
            ) {

                delete currentUserData.friends[friendToDelete];
                delete userToDeleteData.friends[currentUserID];

                await set(currentUserRef, currentUserData);
                await set(userToDeleteRef, userToDeleteData);

            }
        } 

    } catch (error) {
        console.error('Error in deleteFriend:', error);
    }
}

export const friendEventInvite = async (recipientID, eventID, senderID) => {

    const recipientRef = ref(db, `users/${recipientID}`);
    const senderRef = ref(db, `users/${senderID}`);

    const recipientSnapshot = await get(recipientRef);
    const senderSnashot = await get(senderRef);

    const recipientData = recipientSnapshot.val();
    const senderData = senderSnashot.val();

    if (recipientSnapshot.exists() && senderSnashot.exists()) {

     const incomingEventRequests = recipientData.incomingEventRequests || {};
     const outGoingEventRequests = senderData.outGoingEventRequests || {};
     incomingEventRequests[eventID] = true;
     outGoingEventRequests[eventID] = true;

     await update(ref(db, `users/${recipientID}`), {  
        incomingEventRequests,
      });
      await update(ref(db, `users/${senderID}`), {  
        outGoingEventRequests,
      });

    }
}


export const removeIncomingEventRequest = async (recipientID, eventID) => {
    
    try {  
        
    const recipientRef = ref(db, `users/${recipientID}`);
    const recipientSnapshot = await get(recipientRef);
    const recipientData = recipientSnapshot.val();

    if (recipientSnapshot.exists()) {

        const incomingEventRequests = recipientData.incomingEventRequests || {};

        delete incomingEventRequests[eventID];

        await update(ref(db, `users/${recipientID}`), {
            incomingEventRequests: incomingEventRequests,
        });

    }

    } catch (error) {
        console.error(error)
    }
}