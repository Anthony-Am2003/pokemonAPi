import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import "./Favorites.css";

const Favorites = () => {
  const myFavorites = useSelector((state) => state.myFavorites);

  return (
    <div>
      <div className="Favorites">
        {myFavorites.length === 0? <h1>Add Favorites</h1>: myFavorites?.map(({ id, name, attack, image, type }) => (
          <Card
            key={id}
            id={id}
            name={name}
            attack={attack}
            image={image}
            type={type}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
  