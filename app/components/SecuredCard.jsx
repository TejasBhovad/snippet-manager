import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LuFolderLock } from "react-icons/lu";

const SecuredCard = ({ directory  }) => {
  return (
    <div className="text-white w-full px-4">
      <Accordion type="single" collapsible>
        <AccordionItem value={`item-1`}>
          <AccordionTrigger className="text-sm w-full bg-util bg-opacity-30 p-0 px-3 py-2 rounded-md flex items-center justify-start gap-2">
            <LuFolderLock className="w-4 h-4 p-0 m-0 rotate-0 transform" />
            {directory.name}
          </AccordionTrigger>
          <AccordionContent className="bg-util bg-opacity-10 border-[1px] border-util py-1 border-opacity-10 flex flex-col gap-0">
            {directory.files.map((file) => (
              <button
                key={file.id}
                className="text-left w-full bg-util bg-opacity-5 p-0 px-2 py-2 rounded-md hover:bg-opacity-25 transition-colors duration-170 ease-in-out"
              >
                {file}
              </button>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SecuredCard;
