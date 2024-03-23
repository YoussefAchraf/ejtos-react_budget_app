// CurrencySelector.js
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CurrencySelector = () => {
    const { currency, dispatch } = useContext(AppContext);

    const handleCurrencyChange = (event) => {
        const newCurrency = event.target.value;
        dispatch({ type: 'CHG_CURRENCY', payload: newCurrency });
    }

    return (
        <div className='form-group'>
            <label htmlFor="currencySelect">Select Currency:</label>
            <select className='form-control' id="currencySelect" value={currency} onChange={handleCurrencyChange}>
                <option value="£">Pound (£)</option>
                <option value="$">Dollar ($)</option>
                <option value="€">Euro (€)</option>
                <option value="₹">Rupee (₹)</option>
            </select>
        </div>
    );
};

export default CurrencySelector;
