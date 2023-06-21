import React from "react";
import Card from "../Card/Card";
 import './Cards.css';
const Cards = ({Pokemons})=>{
    return (
    <div className="card-container">
        {Pokemons.map(({id, name, attack, image, type})=>{
            return (
                <Card
                key={id}
                id={id}
                name={name}
                attack={attack}
                image={image}
                type={type}
                />
            )
        })}
    </div>
    )
};

export default Cards;