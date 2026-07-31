
import { useState, React, useEffect, useMemo } from 'react';
import Counter from './components/Counter';
import TemperatureConverter from './components/TemperatureConverter';
import TodoApp from './components/todo/TodoApp'
import Greeting from './components/Greeting';
import DummyPhotos from './components/DummyPhotos';
import Authentication from './components/user/Authentication';

function App() {

  return (
    <div className='d-flex flex-row gap-4 w-full min-h-screen items-start justify-center bg-slate-100 p-5'>
      {/* useMemo & React.memo Demonstration
        <Counter count={count} resetCount={resetCount} incr={incr} decr={decr} />
        <Greeting />
        <DummyPhotos photos={updatedPhotos} setSearch={setSearch} search={search} />
      */}
      
      {/* <TemperatureConverter /> // Re-usable states & component demonstration */}



      <Authentication />
      {/* <TodoApp /> */}
    </div>
  );
}

export default App;
