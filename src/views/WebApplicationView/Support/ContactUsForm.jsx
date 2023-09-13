// import { useContext, useState } from "react";
// import { AuthContext } from "../../../context/UserContext";
// import { sendSupportTicket } from "../../../services/tickets.service";



// const ContactUsForm = () => {
//   const { userData } = useContext(AuthContext);
//   const [ticketFormData, setTicketFormData] = useState({
//     subject: "",
//     message: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTicketFormData({
//       ...ticketFormData,
//       [name]: value,
//     };

//     // Log the updated values here
//     console.log("Updated values:", ticketFormData.subject, ticketFormData.message);
//   };

//   const handleSendMsgBtnClick = async () => {
//     console.log(ticketFormData.subject, ticketFormData.message);
//     await sendSupportTicket(
//       userData.uid,
//       userData.email,
//       ticketFormData.subject,
//       ticketFormData.message
//     );
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//   };

//   return (
//     <section className="bg-white dark:bg-gray-900">
//       <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
//         <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
//         <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
//         <form  action="#" onSubmit={handleFormSubmit} className="space-y-8">
//           <div>
//             <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
//             <input onChange={handleInputChange} type="text" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
//           </div>
//           <div className="sm:col-span-2">
//             <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
//             <textarea onChange={handleInputChange} rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
//           </div>
//           <button onClick={handleSendMsgBtnClick} type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
//         </form>
//       </div>
//     </section>
//   );
// }

// export default ContactUsForm;


import { useContext } from "react";
import { AuthContext } from "../../../context/UserContext";
import { sendSupportTicket } from "../../../services/tickets.service";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const ContactUsForm = () => {
  const { userData } = useContext(AuthContext);

  const schema = Yup.object().shape({
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSendMsgBtnClick = async (data) => {
    console.log(data.subject, data.message);
    await sendSupportTicket(
      userData.uid,
      userData.email,
      data.subject,
      data.message
    );
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Let us know.</p>
        <form onSubmit={handleSubmit(handleSendMsgBtnClick)} className="space-y-8">
          <div>
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
            <Controller
              name="subject"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="Let us know how we can help you"/>
              )}
            />
            <div className="invalid-feedback text-red-700 text-sm">{errors.subject?.message}</div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
            <Controller
              name="message"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <textarea
                  {...field}
                  rows="6"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Leave a comment..."/>
              )} />
            <div className="invalid-feedback text-red-700 text-sm">{errors.message?.message}</div>
          </div>
          <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
        </form>
      </div>
    </section>
  );
}

export default ContactUsForm;
