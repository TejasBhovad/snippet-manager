import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DirCard = ({ directory }) => {
  return (
    <div className="text-white w-full px-4">
      <Accordion type="single" collapsible>
        <AccordionItem value={`item-1`}>
          <AccordionTrigger className="text-sm w-full bg-util bg-opacity-30 p-0 px-2 py-2 rounded-md">
            {directory.name}
          </AccordionTrigger>
          <AccordionContent className="bg-util bg-opacity-10 border-[1px] border-util px-2 py-1 border-opacity-10">
            {directory.files.map((file) => (
              <span
                key={file}
                className="bg-util bg-opacity-10 rounded-sm w-full"
              >
                {file}
                <br />
              </span>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default DirCard;
