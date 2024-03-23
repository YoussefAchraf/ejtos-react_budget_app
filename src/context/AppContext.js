import React, { createContext, useReducer } from 'react';

export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            let totalBudget = state.expenses.reduce(
                (previousExp, currentExp) => previousExp + currentExp.cost, 0
            );
            totalBudget += action.payload.cost;
            if (totalBudget <= state.budget) {
                const updatedExpenses = state.expenses.map((currentExp) => {
                    if (currentExp.name === action.payload.name) {
                        currentExp.cost += action.payload.cost;
                    }
                    return currentExp;
                });
                return {
                    ...state,
                    expenses: updatedExpenses,
                };
            } else {
                alert("Cannot increase the allocation! Out of funds");
                return state;
            }
        case 'RED_EXPENSE':
            const updatedExpensesRed = state.expenses.map((currentExp) => {
                if (currentExp.name === action.payload.name && currentExp.cost - action.payload.cost >= 0) {
                    currentExp.cost -= action.payload.cost;
                }
                return currentExp;
            });
            return {
                ...state,
                expenses: updatedExpensesRed,
            };
        case 'DELETE_EXPENSE':
            const filteredExpenses = state.expenses.filter((currentExp) => currentExp.name !== action.payload);
            return {
                ...state,
                expenses: filteredExpenses,
            };
        case 'SET_BUDGET':
            const newBudgetValue = action.payload;
            const totalExpenses = state.expenses.reduce((total, item) => total + item.cost, 0);
            if (newBudgetValue >= totalExpenses) {
                return {
                    ...state,
                    budget: newBudgetValue,
                };
            } else {
                alert("Cannot set budget lower than total expenses.");
                return state;
            }
        case 'CHG_CURRENCY':
            return {
                ...state,
                currency: action.payload,
            };
        default:
            return state;
    }
};

const initialState = {
    budget: 2000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: '£'
};

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const totalExpenses = state.expenses.reduce((total, item) => total + item.cost, 0);
    const remaining = state.budget - totalExpenses;

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                remaining: remaining,
                dispatch,
                currency: state.currency
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
