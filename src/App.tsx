/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

import Header from './components/Header';
import Footer from './components/Footer';
import ErrorNotification from './components/ErrorNotification';
import TodoList from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const [error, setError] = useState('');
  //const [isLoading, setIsLoading] = useState(false);
  const [selectedNav, setSelectedNav] = useState('all');
  const inputRef = useRef<HTMLInputElement>(null);

  const loadTodos = async () => {
    setError('');

    //setIsLoading(true);
    try {
      const res = await getTodos();

      setFilteredTodos(res);
      setTodos(res);
    } catch (err) {
      setError('Unable to load todos');
    } finally {
      inputRef.current?.focus();
      //setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);

      return () => clearTimeout(timer);
    }

    return;
  }, [error]);

  const handelFilter = (e: React.MouseEvent) => {
    const filter =
      e.currentTarget.getAttribute('href')?.replace('#/', '') || 'all';

    switch (filter) {
      case 'active':
        setFilteredTodos(todos.filter(todo => !todo.completed));
        setSelectedNav('active');
        break;
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed));
        setSelectedNav('completed');
        break;
      default:
        setFilteredTodos(todos);
        setSelectedNav('all');
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header inputRef={inputRef} />

        <TodoList filteredTodos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <Footer
            todos={todos}
            selectedNav={selectedNav}
            handelFilter={handelFilter}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification error={error} setError={setError} />
    </div>
  );
};
