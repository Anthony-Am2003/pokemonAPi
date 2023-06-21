import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import { useState, useEffect } from "react";
import { addFav, removeFav } from "../../Redux/action";
import { connect } from 'react-redux';

const Card = ({ id, name, attack, image, myFavorites, addFav, removeFav, type }) => {
  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () => {
    isFav ? removeFav(id) : addFav({ id, name, attack, image, type});
    setIsFav(!isFav);
  }

  useEffect(() => {
    myFavorites.forEach((fav) => {
      if (fav.id === id.toString()) {
        setIsFav(true);
      }
    });
  }, [myFavorites, id]);

  return (
    <div className='card'>
      <div>
        <h3 className="card-name">{name.toUpperCase()}</h3>
      <button className="card button" onClick={handleFavorite}>{isFav ? '❤️' : '🤍'}</button>
    </div>
      <Link to={`/detail/${id}`}>
        <div>
          <img src={image} alt="" />
        </div>
       
       
        <div className="card-content">
  <h3 className="types-title">TYPES</h3>
  <ul>
    {type.map((name, index) => {
      return <li key={index}>{name}</li>;
    })}
  </ul>
</div>
      </Link>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFav: (pokemon) => dispatch(addFav(pokemon)),
    removeFav: (id) => dispatch(removeFav(id)),
  }
};

const mapStateToProps = (state) => {
  return {
    myFavorites: state.myFavorites
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);