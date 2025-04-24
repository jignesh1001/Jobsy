// import { RadioGroupItem } from "./ui/radio-group";
// import { RadioGroup } from "./ui/radio-group";
// import { Label } from "./ui/label";

// const filterData = [
//   {
//     filterType: "Location",
//     array: ["Delhi", "Banglore", "Hydrabad", "Pune", "Mumbai"],
//   },
//   {
//     filterType: "Industry",
//     array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
//   },
//   {
//     filterType: "Salary",
//     array: ["0-40k", "42-11lakh", "1lakh to 5lakh"],
//   },
// ];
// const FilterCard = () => {
//   return (
//     <div className='w-full bg-white p-3 rounded-mdl'>
//       <h1 className='font-bold text-lg'>Filter Jobs</h1>
//       <hr className="mt-3" />
//       <RadioGroup>
//         {filterData.map((data, index) => (
//           <div>
//             <h1 className='font-bold text-lg'>{data.filterType}</h1>
//             {data.array.map((item, index) => {
//               return (
//                 <div className="flex items-center space-x-2 my-2">
//                   <RadioGroupItem value={item} />
//                   <Label>{item}</Label>
//                 </div>
//               );
//             })}
//           </div>
//         ))}
//       </RadioGroup>
//     </div>
//   );
// };

// export default FilterCard;




import { RadioGroupItem } from "./ui/radio-group";
import { RadioGroup } from "./ui/radio-group";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-11lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  return (
    <div className="w-full bg-white p-3 rounded-mdl">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />

      {filterData.map((data, index) => (
        <div key={index} className="mt-4">
          <h1 className="font-bold text-lg">{data.filterType}</h1>
          <RadioGroup>
            {data.array.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center space-x-2 my-2">
                <RadioGroupItem value={item} id={`${data.filterType}-${item}`} />
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
