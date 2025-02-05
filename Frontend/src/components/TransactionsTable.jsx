import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionsTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1); // Total pages for the selected month
  const [expandedDescriptionId, setExpandedDescriptionId] = useState(null);
  const [expandedTitleId, setExpandedTitleId] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, [month, search, page]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/transactions?month=${month}&search=${search}&page=${page}&perPage=${perPage}`
      );
      setTransactions(response.data.transactions); // Assuming backend returns { transactions, totalPages }
      setTotalPages(response.data.totalPages); // Set total pages from backend
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const toggleDescription = (id) => {
    setExpandedDescriptionId(expandedDescriptionId === id ? null : id);
  };

  const toggleTitle = (id) => {
    setExpandedTitleId(expandedTitleId === id ? null : id);
  };

  return (
    <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">Transactions Table</h2>
      <input
        type="text"
        placeholder="Search by title, description, or price"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-white"
      />
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2 hidden md:table-cell">ID</th>
              <th className="p-2">Image</th>
              <th className="p-2">Title</th>
              <th className="p-2">Description</th>
              <th className="p-2">Price</th>
              <th className="p-2 hidden md:table-cell">Category</th>
              <th className="p-2">Sold</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b hover:bg-gray-50">
                <td className="p-2 hidden md:table-cell">{transaction.id}</td>
                <td className="p-2">
                  <img 
                    src={transaction.image} 
                    alt={transaction.title}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/50';
                    }}
                  />
                </td>
                <td 
                  className="p-2 font-medium cursor-pointer"
                  onClick={() => toggleTitle(transaction.id)}
                >
                  <div className={`max-w-[150px] md:max-w-[200px] ${expandedTitleId === transaction.id ? 'whitespace-normal' : 'truncate'}`}>
                    {transaction.title}
                  </div>
                </td>
                <td 
                  className="p-2 cursor-pointer"
                  onClick={() => toggleDescription(transaction.id)}
                >
                  <div className={`max-w-[200px] md:max-w-[300px] ${expandedDescriptionId === transaction.id ? 'whitespace-normal' : 'truncate'}`}>
                    {transaction.description}
                  </div>
                </td>
                <td className="p-2">${transaction.price}</td>
                <td className="p-2 hidden md:table-cell">{transaction.category}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded ${transaction.sold ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {transaction.sold ? "Yes" : "No"}
                  </span>
                </td>
                <td className="p-2 whitespace-nowrap">
                  {new Date(transaction.dateOfSale).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
        >
          Previous
        </button>
        <span className="text-gray-700">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages} // Disable "Next" if no more pages
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;