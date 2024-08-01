import React from 'react'
import TodoList from '../../components/TodoList/TodoList';
import './Home.css';

const Home = () => {
  return (
    <div className='container'>
      <TodoList></TodoList>
    </div>
  )
}

export default Home