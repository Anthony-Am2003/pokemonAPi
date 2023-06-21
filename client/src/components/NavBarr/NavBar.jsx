
import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import axios from "axios";
import "./NavBarra.css";
import { changePage } from "../../Redux/action";
import { useDispatch } from "react-redux";
import { typeFilter } from "../../Redux/action";
import { getPokemonId } from "../../Redux/action";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const onSearch = async (name) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/pokemon?name=${name}`);
      if (data.name) {
        navigate(`/detail/${data.id}`);
        dispatch(getPokemonId(data.id))
      }
    } catch (error) {
      alert("Pokemon No Encontrado");
    }
  };
  const handlePage = (event) => {
    dispatch(changePage(0));
  };

  return (
    <div className="NavBar">
      <SearchBar onSearch={onSearch} />
      <NavLink to="/home/0">
        <button onClick={handlePage}>Home</button>
      </NavLink>
      <NavLink to="/about">
        <button>About</button>
      </NavLink>
      <NavLink to="/create">
        <button>Create</button>
      </NavLink>
      <NavLink to='/fav'>
        <button>Favorites</button>
      </NavLink>
    </div>
  );
};

export default NavBar;