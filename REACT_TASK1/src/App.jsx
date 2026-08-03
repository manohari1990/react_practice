
import { useState, React, useEffect, useMemo } from 'react';

import Counter from './components/Counter';
import TemperatureConverter from './components/TemperatureConverter';
import Greeting from './components/Greeting';
import DummyPhotos from './components/DummyPhotos';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Todo from './pages/Todo'
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { useAuth } from './hooks/useAuth';

function App() {
  return (
    <Routes>
      <Route path='/todos' element={
        <ProtectedRoute>
          <Todo />
        </ProtectedRoute>
      } />
      <Route path='/login' element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path='/register' element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
      
    </Routes>
  )

  // return (
  //   <div className='d-flex flex-row gap-4 w-full min-h-screen items-start justify-center bg-slate-100'>
  //     {/* useMemo & React.memo Demonstration
  //       <Counter count={count} resetCount={resetCount} incr={incr} decr={decr} />
  //       <Greeting />
  //       <DummyPhotos photos={updatedPhotos} setSearch={setSearch} search={search} />
  //     */}

  //     {/* <TemperatureConverter /> // Re-usable states & component demonstration */}



  //         <Login />

  //     {/* <TodoApp /> */}
  //   </div>
  // );
}

export default App;
