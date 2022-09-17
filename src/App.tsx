import React ,{FC} from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from "./components/home/Home";

import './App.css';

const  App :FC =() => {
  return (
    <div className="App">
           <BrowserRouter>
          
          <Routes>
            <Route path='/' element={<Home/>}/>
          </Routes>
           </BrowserRouter>
      
    </div>
  );
}

export default App;


