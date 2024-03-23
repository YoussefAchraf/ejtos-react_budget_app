// Remaining.js
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Remaining = () => {
    const { expenses, budget, currency } = useContext(AppContext);
    const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);
    const remainingAmount = budget - totalExpenses;

    return (
        <div className={`alert ${remainingAmount < 0 ? 'alert-danger' : 'alert-success'}`}>
            <span>Remaining: {currency}{remainingAmount}</span>
        </div>
    );
};

export default Remaining;
