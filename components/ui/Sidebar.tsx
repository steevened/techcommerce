import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Checkbox,
  Input,
} from '@material-tailwind/react';
import React, { Fragment, useState } from 'react';

export const Sidebar = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <div className="w-64 h-full min-h-[calc(100vh-82px)] px-5 py-10 bg-gray-100 fixed">
      <h2 className="text-2xl font-semibold text-blue-gray-700">Filters</h2>
      <Accordion open={open === 1}>
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className="text-xl text-blue-gray-400"
        >
          Name
        </AccordionHeader>
        <AccordionBody>
          <Input variant="outlined" label="Search by name" />
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader
          onClick={() => handleOpen(2)}
          className="text-xl text-blue-gray-400"
        >
          Price
        </AccordionHeader>
        <AccordionBody>
          <div className="space-y-5">
            <Input variant="outlined" label="From" type="number" />
            <Input variant="outlined" label="To" type="number" />
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3}>
        <AccordionHeader
          onClick={() => handleOpen(3)}
          className="text-xl text-blue-gray-400"
        >
          Category
        </AccordionHeader>
        <AccordionBody>
          <div>
            <Checkbox label="KITCHEN" />
            <Checkbox label="SMART TV" />
            <Checkbox label="SMARTHPHONES" />
            <Checkbox label="COMPUTERS" />
          </div>
        </AccordionBody>
      </Accordion>
    </div>
  );
};
