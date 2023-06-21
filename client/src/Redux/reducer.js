const initialState = {
  myFavorites: [],
  allCharactersFav: [],
  pokemonsApi:[],
  pokemons: [],
  pokemonsCopy: [],
  pokemonsRestore:[],
  visiblePokemons: [],
  pokemonsBD:[],
  types: [],
  typesCopy:[],
  pokemonId:[],

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FAV":
      return {
        ...state,
        myFavorites: action.payload,
        allCharactersFav: action.payload,
      };
    case "REMOVE_FAV":
      return {
        ...state,
        myFavorites: action.payload,
        allCharactersFav: action.payload,
      };
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        pokemonsCopy: action.payload,
        pokemonsRestore: action.payload,
        pokemonsApi: action.payload,
      };
    case "ORDER":
      let pokemonsInOrder = [...state.pokemonsCopy];
      if (action.payload === "asc") {
        pokemonsInOrder.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (action.payload === "desc") {
        pokemonsInOrder.sort((a, b) => b.name.localeCompare(a.name));
      }
      if (action.payload === "attack") {
        pokemonsInOrder.sort((a, b) => b.attack - a.attack);
      }
      if (action.payload === "weakness") {
        pokemonsInOrder.sort((a, b) => a.attack - b.attack);
      }

      if (action.payload === "") {
        pokemonsInOrder = [...state.pokemonsCopy];
      }
      return {
        ...state,
        pokemons: [...pokemonsInOrder],
      };
    case "SET_PAGE":
      let pokemonPage = [...state.pokemons];
      const page = action.payload;
      const pokemonsPerPage = 12;
      const startIndex = page * pokemonsPerPage;
      const endIndex = startIndex + pokemonsPerPage;
      const pokemonsForPage = pokemonPage.slice(startIndex, endIndex);
      return {
        ...state,
        visiblePokemons: [...pokemonsForPage],
      };
    case "TYPE_FILTER":
      const type = action.payload;
      let pokemonsType = [...state.pokemonsRestore];
      if (type === "") {
        pokemonsType = [...state.pokemonsRestore];
      } else {
        pokemonsType = pokemonsType.filter(
          (poke) => poke.type[0] === type || poke.type[1] === type
        );
      }
      return {
        ...state,
        pokemons: pokemonsType,
        pokemonsCopy: pokemonsType,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "GET_POKEMONSDB": 
      return{
        ...state,
        pokemonsBD:action.payload,
      };
    case "SET_SOURCE":
    let pokemonsSource = []
    if(action.payload === "db") pokemonsSource = [...state.pokemonsBD];
    if(action.payload === "api") pokemonsSource = [...state.pokemonsApi];
    if(action.payload === '') pokemonsSource = [...state.pokemonsRestore]
    return{...state,
      pokemons:pokemonsSource,
      pokemonsCopy:pokemonsSource,
      pokemonsRestore:pokemonsSource,
    };
    case 'GET_POKEMON_ID': 
      return{
        ...state,
        pokemonId:action.payload,
      };   
    case 'CLEAN_ID':
      return{
        ...state,
        pokemonId:[],
      };
      default:
      return { ...state };
  }
};

export default reducer;
