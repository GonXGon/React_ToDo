import React from 'react';
import './Additem.css';
import { updateTask, deleteTask } from '../../DB/db';

const Additem = ({ item, toggleItemState, setItems, db }) => {
    const deleteItem = (index) => {
        const itemToDelete = item[index];
        deleteTask(db, itemToDelete.id).then(() => {
            const newItems = item.filter((_, i) => i !== index);
            setItems(newItems);
        });
    };

    const editItem = (index, newDescription, toggleEdit = false) => {
        const newItems = item.map((item, i) => {
            if (i === index) {
                const updatedItem = {
                    ...item,
                    description: toggleEdit ? item.description : newDescription,
                    isEditing: toggleEdit ? !item.isEditing : item.isEditing
                };
                updateTask(db, updatedItem).then(() => {
                    setItems(newItems);
                });
                return updatedItem;
            }
            return item;
        });
        setItems(newItems);
    };

    return (
        <div className='activeItem-container'>
            <ul className='activeList'>
                {item.map((item, index) => (
                    <li key={index} className='detail-container'>
                        <div className='item-container'>
                            <input
                                className='checkbox-input'
                                type="checkbox"
                                checked={item.state === 'Completed'}
                                onChange={() => toggleItemState(index)}
                            />
                            {item.isEditing ? (
                                <div className='item-container'>
                                    <input 
                                        className='item-input'
                                        type="text" 
                                        value={item.description} 
                                        onChange={(e) => editItem(index, e.target.value)}
                                    />
                                </div>
       
                            ) : (
                                <span>{item.description}</span>
                            )}
                        </div>
                        <div className='button-container'>
                            <button onClick={() => editItem(index, item.description, true)}>Edit</button>
                            <button onClick={() => deleteItem(index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Additem;
