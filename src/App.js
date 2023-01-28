import React, { useState }  from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import './scss/app.scss';

export const SearchContex = React.createContext()

function App() {
  const [serchValue, setSearchValue] = useState('');
  return (
    <div className='wrapper'>
      <SearchContex.Provider value={{serchValue,setSearchValue}}>
        <Header></Header>
        <div className='content'>
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/cart' element={<Cart/>}></Route>
              <Route path='*' element={<NotFound/>}></Route>
            </Routes>
          </div>
        </div>
      </SearchContex.Provider>
    </div>
  );
}

export default App;
