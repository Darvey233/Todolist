import { useState } from "react";

import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

interface todo {
  title: string;
  done: boolean;
}

export default function Home() {

  // State for todo list
  const [todos, setTodos] = useState<todo[]>([]);

  const [newTodo, setNewTodo] = useState('');

  const [filter, setFilter] = useState('All');

  // Function to add new todo
  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, {title:newTodo, done:false}]);
      setNewTodo('');
      console.log('adding');
    }
  };

  const removeTodo = (index:number) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  }

  const toggleDone = (index:number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos);
  }

  const filteredTodos = () => {
    switch (filter) {
      case 'Done':
        return todos.filter((t) => t.done);
      case 'Not Done':
        return todos.filter((t) => !t.done);
      default:
        return todos;
    }
  };

  return (
    <main className={`${styles.main} ${inter.className}`}>
      <div className={styles.header}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a todo..." 
            style={{ width: 325 }} />{" "}
          <button onClick={addTodo}>Add todo</button>
          <div>
            <button onClick={() => setFilter('All')}>All</button>
            <button onClick={() => setFilter('Done')}>Done</button>
            <button onClick={() => setFilter('Not Done')}>Not Done</button>
          </div>
          <ul>
            {filteredTodos().map((todo, index) => (
              <li 
                key={index}>
                <span style={{textDecoration: todo.done ? 'line-through' : 'none'}}>
                  {todo.title}
                </span>
                <button onClick={() => toggleDone(index)}>
                  {todo.done ? 'Undone' : 'Done'}
                </button>
                <button onClick={() => removeTodo(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
