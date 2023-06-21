import { useState } from "react";
import axios from "axios";
import "./CreatePokemon.css"
import { connect } from "react-redux";
import { getPokemonsBD } from "../../Redux/action";
import { useDispatch } from "react-redux";


const CreatePokemon = ({types})=>{
    const [errors, setErrors] = useState({
        name:'',
        life:0,
        attack:0,
        defense:0
    })
    const [inputState, setInputState]=useState({
        name:'',
        image:'',
        life:0,
        attack:0,
        defense:0,
        types:[],
        speed:0,
        weight:0,
    })
    const [cardData, setCardData] = useState({
      name: '',
      image: 'https://img.freepik.com/iconos-gratis/usuario-forma-negro_318-34174.jpg?w=360',
      life:0,
        attack:0,
        defense:0,
        types:[],
        speed:0,
        weight:0,
    });
const dispatch = useDispatch();

    const handleData = (event)=>{
        setInputState({
            ...inputState,
            [event.target.name]: event.target.value
        })
        setErrors({
            ...errors,
            [event.target.name]: event.target.value
          }) 
          setCardData({
            ...cardData,
            [event.target.name]: event.target.value
          });
    }
    const handleTypeChange = (event) => {
      if (event.target.value === '') {
        if (inputState.types.length === 1) {
          setInputState({
            ...inputState,
            types: []
          });
          setCardData({
            ...cardData,
            types: []
          });
        } else {
          setInputState({
            ...inputState,
            types: [inputState.types[1]]
          });
          setCardData({
            ...cardData,
            types: [cardData.types[1]]
          });
        }
        return;
      }
    
      const selectedTypeKey = event.target.value;
      const selectedType = types.find((type) => type.name === selectedTypeKey);
      setInputState({
        ...inputState,
        types: [selectedType.id, inputState.types[1]]
      });
    
      setCardData({
        ...cardData,
        types: [selectedTypeKey, cardData.types[1]]
      });
    };
    
    const handleTypeChange2 = (event) => {
      if (event.target.value === '') {
        if (inputState.types.length === 1) {
          setInputState({
            ...inputState,
            types: []
          });
          setCardData({
            ...cardData,
            types: []
          });
        } else {
          setInputState({
            ...inputState,
            types: [inputState.types[0]]
          });
          setCardData({
            ...cardData,
            types: [cardData.types[0]]
          });
        }
        return;
      }
    
      const selectedTypeKey = event.target.value;
      const selectedType = types.find((type) => type.name === selectedTypeKey);
      setInputState({
        ...inputState,
        types: [inputState.types[0], selectedType.id]
      });
    
      setCardData({
        ...cardData,
        types: [cardData.types[0], selectedTypeKey]
      });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await axios.post("http://localhost:3001/pokemons", inputState);
        alert("Pokemon registrado");
      } catch (error) {
        if (error.response) {
          alert(error.response.data);
        } else {
          alert("Error al registrar el Pokémon");
        }
      }
      dispatch(getPokemonsBD());
    };
    


    return(
        <div className="container">
            <div className="card-container">
        {cardData.name && (
          <div className="carta">
            <img src={cardData.image} alt={cardData.name} />
            <h2>{cardData.name}</h2>
            <p>Attack: {cardData.attack}</p>
            <p>Defense: {cardData.defense}</p>
            <p>Life: {cardData.life}</p>
            <p>Speed: {cardData.speed}</p>
            <p>Weight: {cardData.weight}</p>
            <p>Types: {cardData.types.join(', ')}</p>
          </div>
        )}
      </div>
      <div className="form-container">

            <form onSubmit={handleSubmit}>
                <label htmlFor="Name">Name: </label>
                <input type="text" name="name"  onChange={handleData}/>
                {errors.name.length > 15? <p>Nombre demasiado largo</p>:''}
                <label htmlFor="Image">Image Link: </label>
                <input type="text" name="image" onChange={handleData}/>
                <label htmlFor="Attack">Attack: </label>
                <input type="number"  name="attack" onChange={handleData}/>
                {errors.attack > 300? <p>Attack no puede superar los 300</p>:''}
                <label htmlFor="Defense">Defense: </label>
                <input type="number"  name="defense"  onChange={handleData}/>
                {errors.defense > 300? <p>Defense no puede superar los 300</p>:''}
                <label htmlFor="Life">Life Points: </label>
                <input type="number" name="life" onChange={handleData}/>
                {errors.life > 100? <p>life no puede superar los 100</p>:''}
                <label htmlFor="Speed">Speed:</label>
                <input type="number" name="speed" onChange={handleData} />
                {}
                <label htmlFor="Weight">Weight: </label>
                <input type="number" name="weight" onChange={handleData}/>
                <div>
                <label htmlFor="type">Pokemon Types: </label>
          <select name="Select_Type" id="Types" onChange={handleTypeChange}>
            <option value="">Seleccionar tipo</option>
            {types.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
              
            ))}
          </select>
          <select name="Select_Type" id="Types" onChange={handleTypeChange2}>
            <option value="">Seleccionar tipo</option>
            {types.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
              
              ))}
          </select>
                </div>
                <button type="submit" disabled={!inputState.name || !inputState.attack 
                  || !inputState.defense || !inputState.life}>Registrar Pokemon</button>
            </form>
              </div>
        </div>
      
    )
};

const mapStateToProps = (state) => {
  return {
    types: state.types
  };
};


export default connect(mapStateToProps, null)(CreatePokemon);