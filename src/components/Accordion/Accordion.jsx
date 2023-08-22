import Footer from "../Footer/Footer";
import { FifthAccordion } from "./FifthAccordion";
import { SingleAccordion } from "./FirstAccordion";
import { FourthAccordion } from "./FourthAccordion";
import { SecondAccordion } from "./SecondAccordion";
import { ThirdAccordion } from "./ThirdAccordion";

export const Accordion = () => {

  return (
    <>
        <div id="accordion-collapse" data-accordion="collapse">
      <SingleAccordion />
      <SecondAccordion />
      <ThirdAccordion />
      <FourthAccordion />
      <FifthAccordion />
    </div>
    <div>
      <Footer/>
    </div>
    </>
  );
};
