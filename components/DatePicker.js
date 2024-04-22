import React, {useState} from "react"; 
import Datepicker from "react-tailwindcss-datepicker"; 

const DatePicker = (realValue) => { 
const [value, setValue] = useState({ 
startDate: null,
endDate: null 
}); 

const handleValueChange = (newValue) => {
console.log("newValue:", newValue); 
setValue(newValue); 
realValue = newValue;
console.log(realValue)
} 

return (
<Datepicker 
value={value} 
onChange={handleValueChange} 
showShortcuts={true} 
/> 
);
}; 
export default DatePicker;