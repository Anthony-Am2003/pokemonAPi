import axios from 'axios';

export const getPokemons = () =>{
    try {
        const endPoint = 'http://localhost:3001/pokemons';
        return async(dispatch) =>{
   const {data} = await axios.get(endPoint)
            return dispatch({
                type: 'GET_POKEMONS',
                payload: data,
            });
        };
        } catch (error) {
        console.log(error.message)
    }
}

export const getPokemonsBD = ()=>{
    try {
        return async(dispatch) =>{
            const {data} = await axios.get('http://localhost:3001/pokemon/db');
            return dispatch({
                type: "GET_POKEMONSDB",
                payload:data,
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const removeFav = (id)=>{
    try {
        const endpoint = `http://localhost:3001/fav/${id}`;
        return async (dispatch) => {
            const {data} = await axios.delete(endpoint)
            return dispatch({
                type: 'REMOVE_FAV',
                payload: data,
            });
            
        };
    } catch (error) {
        console.log(error.message);
    }
};

export const getTypes = () =>{
    try {
        return async(dispatch) =>{
            const {data} = await axios.get("http://localhost:3001/types");
            return dispatch({
                type: 'GET_TYPES',
                payload: data,
            });

        }
    } catch (error) {
        console.log(error.message)
    }
}

export const addFav = (pokemon)=>{
    try {
        const endPoint = 'http://localhost:3001/fav';
        return async (dispatch) =>{
            const {data} = await axios.post(endPoint, pokemon);
            return dispatch({
                type: 'ADD_FAV',
                payload:data,
            });
        };
    } catch (error) {
        console.log(error.message)
    }
}

export const orderCards = (order) =>{
    return {type: "ORDER", payload: order}
};

export const changePage = (currentPage) =>{
    return {type:"SET_PAGE", payload:currentPage}
}

export const typeFilter = (type) =>{
    return{type:"TYPE_FILTER", payload:type}
}
export const setSource = (org) =>{
    return {
        type:"SET_SOURCE",
        payload:org,
    }
}
export const getPokemonId = (id) => {
    try {
        const endPoint = `http://localhost:3001/pokemonsid/${id}`;
        return async (dispatch) =>{
            const {data} = await axios.get(endPoint);
            return dispatch({type:"GET_POKEMON_ID", payload:data})
        }
    } catch (error) {
        alert(error.message)
    }
}
export const cleanpokemonId = (action) =>{
    return{type:"CLEAN_ID", payload:action}
}