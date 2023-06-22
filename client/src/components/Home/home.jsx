import React, { useEffect } from "react";
import "./Home.css";
import { useSelector, useDispatch } from 'react-redux';
import { orderCards, changePage, typeFilter, setSource, getPokemons, getTypes } from '../../Redux/action';
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Cards from '../Cards/Cards';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { page } = useParams();
  const currentPage = parseInt(page) || 0;

  useEffect(() => {
    const fetchPokemons = async () => {
      if (pokemons.length === 0 || types.length === 0) {
      await dispatch(getPokemons());
      await dispatch(getTypes());
      }
      dispatch(changePage(currentPage));
    };

    fetchPokemons();
  }, [currentPage, dispatch]);

  const handleSourceChange = (event) => {
    dispatch(setSource(event.target.value));
    dispatch(changePage(currentPage));
  };

  const handleSortChange = (event) => {
    dispatch(orderCards(event.target.value));
    dispatch(changePage(currentPage));
  };

  const handlePage = (event) => {
    dispatch(changePage(currentPage));
  };

  const handleTypes = (event) => {
    dispatch(typeFilter(event.target.value));
    dispatch(changePage(0));
    navigate('/home/0');
  };

  const types = useSelector(state => state.types);
  const pokemons = useSelector(state => state.pokemons);
  const visiblePokemons = useSelector(state => state.visiblePokemons);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(pokemons.length / itemsPerPage);
  const pagesArray = [];
  for(let i = 0; i<totalPages; i++){
    pagesArray.push(i)
  }

  return (
    <div className="Home">
      <div>
        <label htmlFor="source">Data source:</label>
        <select id="source" onChange={handleSourceChange}>
          <option value="">...</option>
          <option value="db">Created</option>
          <option value="api">API</option>
        </select>
        <label htmlFor="sortOrder">Order:</label>
        <select id="sortOrder" onChange={handleSortChange}>
          <option value="">...</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="attack">Stronger</option>
          <option value="weakness">Weaker</option>
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
      {visiblePokemons.length === 0 && <h1>There are no Pokemons of this type</h1>}
      {visiblePokemons.length > 0 && <Cards Pokemons={visiblePokemons} />}
      <div className="pagination">
        <Link to={`/home/${currentPage - 1}`}>
          <button disabled={currentPage === 0} onClick={handlePage}>
          Previous
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
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;