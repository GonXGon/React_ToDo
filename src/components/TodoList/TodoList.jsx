import React, { useEffect, useState } from 'react';
import './TodoList.css';
import Additem from '../Additem/Additem';
import { openDB, addTask, getTasks, updateTask } from '../../DB/db';

const TodoList = () => {
    const [description, setDescription] = useState('');
    const [item, setItems] = useState([]);
    const [filter, setFilter] = useState('All');
    const [db, setDb] = useState(null);

    useEffect(() => {
        openDB().then((response) => {
            setDb(response);
            getTasks(response).then((tasks) => {
                setItems(tasks);
            });
        });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        const newTask = { description, state: 'Active', isEditing: false };
        addTask(db, newTask).then(() => {
            setItems([...item, newTask]);
            setDescription('');
        })
    };

    const toggleItemState = (index) => {
        const newItems = item.map((item, i) => {
            if (i === index) {
                const updatedItem = {...item, state: item.state === 'Active' ? 'Completed' : 'Active'};
                updateTask(db, updatedItem).then(() => {
                    setItems(newItems);
                });
                return updatedItem;
            }
            return item;
        });
        setItems(newItems);
    };

    const filterItem = item.filter((item) => {
        if (filter === 'All') return true;
        return item.state === filter;
    });

    return (
        <div className="todolist-container">
            <div className="todolist-card">
                <div className="todolist-heading">
                    <h1>Todo List</h1>
                    <h4>What needs to be done?</h4>
                </div>
                <form className="todolist-form" onSubmit={onSubmit}>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <button type="submit">Add</button>
                </form>
                <div className="statesButton-container">
                    <button onClick={() => setFilter('All')}>All</button>
                    <button onClick={() => setFilter('Active')}>Active</button>
                    <button onClick={() => setFilter('Completed')}>Completed</button>
                </div>
                <Additem item={filterItem} setItems={setItems} toggleItemState={toggleItemState} db={db}/>
            </div>
        </div>
    );
};

export default TodoList;
