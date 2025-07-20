import { RadioGroupItem } from "./ui/radio-group";
import { RadioGroup } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";




const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer","Site Engineer", "Golang Engineer", "Data Science"],
  },
  // {
  //   filterType: "Salary",
  //   array: ["0-40k", "42-11lakh", "1lakh to 5lakh"],
  // },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

   const changeHandler =  (value) => {
      setSelectedValue(value);
  };
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue]);
  return (
    <div className="w-full bg-white p-3 rounded-mdl">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      
      <hr className="mt-3" />

      {filterData.map((data, index) => (
        <div key={index} className="mt-4">
          <h1 className="font-bold text-lg">{data.filterType}</h1>
          <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {data.array.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center space-x-2 my-2">
                <RadioGroupItem
                  value={item}
                  id={`${data.filterType}-${item}`}
                />
                <Label htmlFor={`${data.filterType}-${item}`}>{item}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
