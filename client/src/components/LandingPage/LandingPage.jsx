import { NavLink } from "react-router-dom";
import "./LandingPage.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons, getTypes, getPokemonsBD } from "../../Redux/action";
import ImageLanding from './pokemonLanding.png'

const LandingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
    dispatch(getPokemonsBD());
  }, [dispatch]);

  return (
    <div className="containerLanding">
      <h1 className="title">Welcome To Pokemon API</h1>
      <img className="imagePokemones" src={ImageLanding} alt="" />
      <NavLink to="/home/0">
        <button className="button">Ingresar</button>
      </NavLink>
    </div>
  );
};

export default LandingPage;