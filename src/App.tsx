import './App.css'
import './index.css'
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home'
import Overview from './views/Overview';
import Cart from './views/Cart';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
         <Route path='/overview/:id' element={<Overview />} />
          <Route path='/cart' element={<Cart />} />
      </Routes>
    </>
  )
}

export default App;
