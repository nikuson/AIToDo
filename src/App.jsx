import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const fetchAiSuggestion = async (text) => {
    setIsLoadingSuggestion(true);
    try {
      const response = await fetch(`https://text.pollinations.ai/todo%20suggestion%20for%20${text}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.text();
      data = data.replace(/\*\*/g, '');
      setAiSuggestion(data.trim());
    } catch (error) {
      console.error("Could not fetch AI suggestion:", error);
      setAiSuggestion('Error fetching suggestion.');
    } finally {
      setIsLoadingSuggestion(false);
    }
  };

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, completed: false }]);
      fetchAiSuggestion(newTodo);
      setNewTodo('');
    }
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, idx) =>
      idx === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, idx) => idx !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-light">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-dark">
          AI Todo App
        </h1>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <div className="mb-4">
            <div className="flex">
              <input
                type="text"
                placeholder="Enter todo item"
                value={newTodo}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-secondary focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
              <button
                onClick={addTodo}
                className="ml-3 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                disabled={isLoadingSuggestion}
              >
                Add
              </button>
            </div>
          </div>
          {aiSuggestion && (
            <div className="mb-4 mt-2 text-sm text-secondary italic">
              💡 Suggestion: {aiSuggestion}
            </div>
          )}
          <ul className="divide-y divide-gray-200">
            {todos.map((todo, index) => (
              <li key={index} className="py-2 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(index)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label className={`ml-3 block text-sm text-dark ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                    {todo.text}
                  </label>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => deleteTodo(index)}
                    className="text-secondary hover:text-red-500"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
