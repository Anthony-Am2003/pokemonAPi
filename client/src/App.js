import './App.css';
import { Route, Routes} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import React from 'react';
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/home';
import CreatePokemon from './components/Create/Create';
import DetailPokemones from './components/Detail/Detail';
import About from './components/About/About'
import NavBar from './components/NavBarr/NavBar';
import Favorites from './components/Favorites/Favorites';
import { useEffect } from 'react';
import NotFound from '../src/components/NotFound/NotFound'

function App() {
const {pathname} = useLocation()
const location = useLocation();
useEffect(() => {
  if (location.state && location.state.error) {
    alert('This Route not exist');
  }
}, [location]);
  return (
    <div className="App">
 {pathname !== "/" && <NavBar/>}
      <Routes>
        <Route path='/fav' element={<Favorites/>}/>
        <Route path='/about' element={<About/>}/>
          <Route path="/" element={<LandingPage/>} />
          <Route  path="/home/:page" element={<Home/>} />
          <Route  path="/create" element={<CreatePokemon/>} />
          <Route  path="/detail/:id" element={<DetailPokemones/>} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;