import { push, ref, set } from "firebase/database";
import { db } from "../firebase/firebase-config";

export const sendSupportTicket = async (userId, userEmail, subject, ticketMessage) => {

    console.log(userId, userEmail, subject, ticketMessage)
    try {
        console.log('Ticket Service Func')
        const ticketRef = ref(db, 'support-tickets');
        const newTicketRef = push(ticketRef);
        const newTicketKey = newTicketRef.key;

        console.log('TicketRef', ticketRef)
        console.log('NewTicket Ref', newTicketRef)

        const ticketData = {
            userId : userId,
            userEmail: userEmail,
            subject: subject,
            ticketMessage: ticketMessage,
            ticketID: newTicketKey,
        };

        console.log('TicketData', ticketData)


        await set(ticketRef, ticketData);


    } catch (error) {
        console.error(error)
    }

}