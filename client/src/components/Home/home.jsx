import Cards from '../Cards/Cards';
import React, { useEffect } from "react";
import "./Home.css";
import { connect } from 'react-redux';
import { orderCards, changePage, typeFilter, setSource } from '../../Redux/action';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = ({ types, pokemons, visiblePokemons}) => {
 const navigate = useNavigate();
  const dispatch = useDispatch();
  const { page } = useParams();
  const currentPage = parseInt(page) || 0;

  useEffect(() => {
    dispatch(changePage(currentPage));

  }, [changePage, currentPage, dispatch]);

  const handleSourceChange = (event) => {
    dispatch(setSource(event.target.value));
    dispatch(changePage(currentPage))
  };

  const handleSortChange = (event) => {
    dispatch(orderCards(event.target.value));
    dispatch(changePage(currentPage))
    
  };

  const handlePage = (event) => {
    dispatch(changePage(currentPage));
  };

  const handleTypes = (event) => {
    dispatch(typeFilter(event.target.value));
    dispatch(changePage(0))
    navigate('/home/0')
  };

  const itemsPerPage = 12;
  const totalPages = Math.ceil(pokemons.length / itemsPerPage);
  const pagesArray = Array.from({ length: totalPages }, (_, index) => index + 0);

  return (
    <div className="Home">
      <div>
        <label htmlFor="source">Fuente de datos:</label>
        <select id="source" onChange={handleSourceChange}>
          <option value="">...</option>
          <option value="db">Base de Datos</option>
          <option value="api">API</option>
        </select>
        <label htmlFor="sortOrder">Orden:</label>
        <select id="sortOrder" onChange={handleSortChange}>
          <option value="">...</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="attack">Mas Fuerte</option>
          <option value="weakness">Mas Debil</option>
        </select>
                <label htmlFor="types">Types</label>
        <select id="types" onChange={handleTypes}>
          <option value="">...</option>
          {types.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <Cards Pokemons={visiblePokemons} />
      <div className="pagination">
        <Link to={`/home/${currentPage - 1}`}>
          <button disabled={currentPage === 0} onClick={handlePage}>
            Anterior
          </button>
        </Link>
        {pagesArray.map((pag) => (
          <Link to={`/home/${pag}`} key={pag}>
            <button onClick={handlePage} disabled={currentPage === pag}>
              {pag}
            </button>
          </Link>
        ))}
        <Link to={`/home/${currentPage + 1}`}>
        <button disabled={currentPage === totalPages - 1} onClick={handlePage}>
Siguiente
</button>
</Link>
</div>
</div>
);
};

const mapStateToProps = (state) => {
return {
visiblePokemons: state.visiblePokemons,
types: state.types,
pokemons: state.pokemons,
pokemonsBD: state.pokemonsBD
};
};



export default connect(mapStateToProps, null)(Home);