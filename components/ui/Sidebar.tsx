import { UIContext } from '@/context/ui/UIContext';
import { Category } from '@/lib/interfaces/products.interface';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Checkbox,
  Input,
} from '@material-tailwind/react';
import { FC, useContext, useState } from 'react';

interface Props {
  inputValue: string;
  setInputValue: (value: string) => void;
  categories: Category[];
  filterByCategories: number[];
  setFilterByCategories: (value: number[]) => void;
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
}

export const Sidebar: FC<Props> = ({
  inputValue,
  setInputValue,
  categories,
  filterByCategories,
  setFilterByCategories,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) => {
  const [open, setOpen] = useState(0);

  const { sidebarOpen, setSidebarOpen } = useContext(UIContext);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <>
      <div
        className={`w-64 h-full min-h-[calc(100vh-82px)] px-5 py-10 bg-white fixed -translate-x-full md:translate-x-0 z-30 duration-200 ease-in-out ${
          sidebarOpen && 'translate-x-0'
        }`}
      >
        <h2 className="text-2xl font-semibold text-blue-gray-700">Filters</h2>
        <Accordion open={open === 1}>
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className="text-xl text-blue-gray-400"
          >
            Name
          </AccordionHeader>
          <AccordionBody>
            <Input
              variant="outlined"
              label="Search by name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
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
              <Input
                variant="outlined"
                label="From"
                type="number"
                // value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
              <Input
                variant="outlined"
                label="To"
                type="number"
                // value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
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
            <div className="flex flex-col">
              {categories.map((category) => (
                <label key={category.id} htmlFor={String(category.id)}>
                  <Checkbox
                    id={String(category.id)}
                    label={category.name}
                    value={category.id}
                    checked={filterByCategories.includes(category.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilterByCategories([
                          ...filterByCategories,
                          category.id,
                        ]);
                      } else {
                        setFilterByCategories(
                          filterByCategories.filter((id) => id !== category.id)
                        );
                      }
                    }}
                  />
                </label>
              ))}
            </div>
          </AccordionBody>
        </Accordion>
      </div>
      <div
        onClick={() => setSidebarOpen(false)}
        className={`absolute inset-0 md:hidden bg-blue-gray-700/50 backdrop-blur z-20 duration-200 ${
          sidebarOpen ? '' : 'opacity-0 pointer-events-none'
        } `}
      />
    </>
  );
};
