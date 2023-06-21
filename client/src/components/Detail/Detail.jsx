import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import './Detail.css';
import {useDispatch} from 'react-redux'
import {getPokemonId, cleanpokemonId} from "../../Redux/action";
import {useSelector} from 'react-redux';

const DetailPokemones = ()=>{
    const {id} = useParams();
    const dispatch = useDispatch()
    const pokemon = useSelector(state => state.pokemonId)
    useEffect(()=>{
        dispatch(getPokemonId(id));
        return () =>{
            dispatch(cleanpokemonId('clean'))
        }
    }, [id]);

    return(
    <div>
        <div className="contenedor">

        <div >
            <h3 className="name">{pokemon?.name?.toUpperCase()}</h3>
            
<img className="image" src={pokemon.image} alt="" />
        </div>
<div className="contenedor2">

            <p>Life: {pokemon.life}</p>
            <p>Attack: {pokemon.attack}</p>
            <p>Defense: {pokemon.defense}</p>
            <p>Speed: {pokemon.speed}</p>
            <p>Weight: {pokemon.weight}Kg</p>
            {pokemon?.types && (
              <div>
                <h3>TYPES</h3>
                {pokemon.types.map((type, index) => <p key={index}>{type}</p>)}
              </div>
            )}
            
            
            
 

</div>

</div>
        </div>
       
    )
}
export default DetailPokemones;