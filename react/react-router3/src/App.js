import React from 'react';
import Login from './components/login'
import Info from './components/Info'
import FetchDemo from './components/Fetch'
import TextHttp from './components/TestHttp'
import RouterIndex from './routerDemo/index'
function App() {
  // const num = 10
  return (

    <div className="App">
      <header className="App-header">
        <Login />
        <Info />
        <FetchDemo />
        <TextHttp />
        <RouterIndex />
      </header>
    </div>
  );
}

export default App;
