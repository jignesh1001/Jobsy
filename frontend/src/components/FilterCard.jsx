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
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Site Engineer",
      "Golang Engineer",
      "Data Science",
    ],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h1 className="font-semibold text-lg sm:text-xl mb-2">Filter Jobs</h1>
      <hr />

      {filterData.map((data, index) => (
        <div key={index} className="mt-6">
          <h2 className="font-semibold text-md sm:text-lg mb-2">
            {data.filterType}
          </h2>
          <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              {data.array.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center space-x-2 my-1"
                >
                  <RadioGroupItem
                    value={item}
                    id={`${data.filterType}-${item}`}
                  />
                  <Label
                    htmlFor={`${data.filterType}-${item}`}
                    className="text-sm sm:text-base"
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
