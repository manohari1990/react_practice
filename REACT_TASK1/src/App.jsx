import React from 'react';
import Counter from './components/Counter';
import TemperatureConverter from './components/TemperatureConverter';
import TodoApp from './components/todo/TodoApp'

function App() {
  return (
    <div className='d-flex flex-row gap-4 w-full min-h-screen items-start justify-center bg-slate-100'>
      {/* <Counter /> */}
      {/* <TemperatureConverter /> */}
      <TodoApp />
    </div>
  );
}

export default App;
