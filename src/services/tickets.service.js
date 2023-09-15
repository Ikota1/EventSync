import { push, ref, set } from "firebase/database";
import { db } from "../firebase/firebase-config";

export const sendSupportTicket = async (userId, userEmail, subject, ticketMessage) => {

    try {
    
        const ticketRef = ref(db, 'support-tickets');
        const newTicketRef = push(ticketRef);
        const newTicketKey = newTicketRef.key;


        const ticketData = {
            userId : userId,
            userEmail: userEmail,
            subject: subject,
            ticketMessage: ticketMessage,
            ticketID: newTicketKey,
        };


        await set(ticketRef, ticketData);


    } catch (error) {
        console.error(error)
    }

}