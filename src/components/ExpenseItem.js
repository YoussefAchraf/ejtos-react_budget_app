import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FaPlus, FaMinus } from 'react-icons/fa'; // Import icons from react-icons library
import Button from 'react-bootstrap/Button'; // Import Bootstrap button component

const ExpenseItem = (props) => {
    const { dispatch, currency } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense,
        });
    };

    const decreaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'RED_EXPENSE',
            payload: expense,
        });
    };

    return (
        <tr>
            <td>{props.name}</td>
            <td>{currency}{props.cost}</td>
            <td>
                <Button variant="success" onClick={() => increaseAllocation(props.name)}>
                    <FaPlus /> {/* Plus symbol */}
                </Button>
            </td>
            <td>
                <Button variant="danger" onClick={() => decreaseAllocation(props.name)}>
                    <FaMinus /> {/* Minus symbol */}
                </Button>
            </td>
            <td>
                <Button variant="danger" onClick={handleDeleteExpense}>
                    Delete
                </Button>
            </td>
        </tr>
    );
};

export default ExpenseItem;
