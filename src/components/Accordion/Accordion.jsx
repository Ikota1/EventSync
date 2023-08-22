import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import styles from '../../style';
 
const  IconAccordion = ({ id, open }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
 
export const AccordionCustomIcon = () => {
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
  return (
    <div>
      <Accordion open={open === 1} icon={<IconAccordion id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>
            <div className="text-white font-poppins ">
                What is Material Tailwind?
            </div>
        </AccordionHeader>
        <AccordionBody>
            <p className={`${styles.paragraph}`}>
                We&apos;re not always in the position that we want to be at. We&apos;re constantly
                growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                ourselves and actualize our dreams.
            </p>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<IconAccordion id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)}>
            <div className="text-white font-poppins">
                How to use Material Tailwind?
            </div>
        </AccordionHeader>
        <AccordionBody>
             <p className={`${styles.paragraph}`}>
                We&apos;re not always in the position that we want to be at. We&apos;re constantly
                growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                ourselves and actualize our dreams.
            </p>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<IconAccordion id={3} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(3)}>
            <div className="text-white font-poppins">
                What can I do with Material Tailwind?
            </div>
        </AccordionHeader>
        <AccordionBody>
            <p className={`${styles.paragraph}`}>
                We&apos;re not always in the position that we want to be at. We&apos;re constantly
                growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                ourselves and actualize our dreams.
            </p>
        </AccordionBody>
      </Accordion>
    </div>
  );
}