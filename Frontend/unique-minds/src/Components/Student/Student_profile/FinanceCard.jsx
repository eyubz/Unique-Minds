import React from "react";

const FinanceCard = ({ label, amount }) => {
  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-gray-600">{label}</h3>
      <p className="text-xl font-bold">{amount}</p>
    </div>
  );
};

export default FinanceCard;
