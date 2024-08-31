import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const DatePicker2 = (props) => {
  const [selectDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <DatePicker
        selected={selectDate}
        onChange={(date) => {
          setSelectedDate(date);
          const tempExpense = props.expense;
          if(date){
          tempExpense.date = date.toDateString();
          }
          props.setExpense(tempExpense);
        }}
        className="p-3 w-3/4 rounded-md outline-none bg-jp-black px-4 placeholder-rp-yellow mt-4 text-jp-white"
        placeholderText="Date"
        showYearDropdown
      />
    </div>
  );
};

export default DatePicker2;
