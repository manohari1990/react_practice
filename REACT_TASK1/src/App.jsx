import React from 'react';
import Counter from './components/Counter';
import TemperatureConverter from './components/TemperatureConverter';
import TodoApp from './components/todo/TodoApp'

function App() {
  return (
    <div className='root_container'>
      {/* <Counter /> */}
      {/* <TemperatureConverter /> */}
      <TodoApp />
    </div>
  );
}

export default App;
