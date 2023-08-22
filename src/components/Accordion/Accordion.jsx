import { SingleAccordion } from "./FirstAccordion";
import { SecondAccordion } from "./SecondAccordion";
import { ThirdAccordion } from "./ThirdAccordion";

export const Accordion = () => {

  return (
    
    <div id="accordion-collapse" data-accordion="collapse">
      <SingleAccordion />
      <SecondAccordion />
      <ThirdAccordion />
    </div>
  );
};
