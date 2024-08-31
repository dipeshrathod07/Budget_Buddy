import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker2 from "./DatePicker2";
import ReactLoading from "react-loading";
import { Scrollbars } from "react-custom-scrollbars";
import { BookText } from "lucide-react";

const AddExpense = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [expense, setExpense] = useState({
    amount: "",
    desc: "",
    date: new Date().toDateString(),
    category: "General",
  });

  const [error, setError] = useState({
    amount: "",
    desc: "",
  });

  const handleAddExpense = async (e) => {
    setIsLoading(true);
    setError({
      amount: "",
      desc: "",
    });
    const res = await fetch("/expense/addexpense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });
    const data = await res.json();
    if (data.errors) {
      setIsLoading(false);
      setError(data.errors);
      console.log(data.errors);
    } else {
      setIsLoading(false);
      props.closeModalExpense();
      navigate("/dashboard");
      window.location.reload();
    }
  };

  const handleChange = (e) => {
    setExpense({...expense,[e.target.name]: e.target.value});
  }

  return (
    <Scrollbars style={{ width: 540, height: 500 }} className="mt-8">
      <div className=" grid grid-cols-6 font-lexend ">
        <div className="col-span-4 bg-rp-black px-6">
          <div className=" flex">
            <h1 className="text-jp-white text-2xl font-bold ">Add Expense</h1>
          </div>
          <form action="">
            <div className="text-jp-white flex mt-4 py-2 gap-3 border-b-2">
              <h1 className="text-4xl">₹</h1>
              <input
                className="bg-rp-black text-3xl outline-none"
                placeholder="0"
                name="amount"
                required
                type="number"
                value={expense.amount}
                onChange={handleChange}
              ></input>
            </div>
            <span className="pt-1 text-sm text-red-500 font-lexend">
              {error.amount}
            </span>
            <div className=" text-jp-white flex mt-4 py-2 gap-3 border-b-2">
              <h1 className="text-4xl"><BookText className="w-7 h-7" /></h1>
              <input
                className="bg-rp-black text-xl w-3/4 outline-none flex-1"
                placeholder="Note"
                name="desc"
                required
                value={expense.desc}
                onChange={handleChange}
              ></input>
            </div>
            <span className="pt-1 text-sm text-red-500 font-lexend">
              {error.desc}
            </span>
            <div>
              <h1 className="text-jp-slate font-bold  mt-4">Category</h1>
            </div>
            <div className="text-mj-black">
              <select
                className="bg-jp-black text-white px-3 py-2 my-1 rounded w-full"
                name="category"
                id="categories"
                value={expense.category}
                onChange={handleChange}
              >
                <option value="General">General</option>
                <option value="Food">Food</option>
                <option value="Fuel">Fuel</option>
                <option value="Grocery">Grocery</option>
                <option value="Shopping">Shopping</option>
                <option value="Travel">Travel</option>
                <option value="Fun">Fun</option>
              </select>
            </div>
            <div>
              <h1 className="text-jp-slate font-bold  mt-4">Date</h1>
            </div>
            <div className="flex">
              <DatePicker2 expense={expense} setExpense={setExpense} />
            </div>
            <div className="border-rp-yellow border-2 rounded-md w-fit px-8 mt-10">
              {isLoading ? (
                <ReactLoading
                  type="bubbles"
                  color="#F5A302"
                  height={50}
                  width={50}
                />
              ) : (
                <button
                  onClick={handleAddExpense}
                  className="font-bold text-jp-yellow py-4"
                >
                  Save Expense
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Scrollbars>
  );
};

export default AddExpense;
