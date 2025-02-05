import React, { useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";

function App() {
  const [month, setMonth] = useState("March");

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Roxiler Systems Dashboard</h1>
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <label className="text-lg font-semibold mr-2">Select Month: </label>
          <select
            value={month}
            onChange={handleMonthChange}
            className="p-2 border border-gray-300 rounded-md bg-white"
          >
            {[
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ].map((m) => (
              <option key={m} value={m} className="text-gray-700">
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-8">
        <TransactionsTable month={month} />
        <Statistics month={month} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BarChart month={month} />
          <PieChart month={month} />
        </div>
      </div>
    </div>
  );
}

export default App;