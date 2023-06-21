import Card from "../Card/Card";
import { connect } from "react-redux";
import './Favorites.css'

const Favorites = ({myFavorites}) =>{
    return (
       <div>

       <div className="Favorites">
            {myFavorites?.map(
                ({id, name, attack, image, type}) =>{
                    return(
                        <Card
                        key={id}
                        id={id}
                        name={name}
                        attack={attack}
                        image={image}
                        type={type}
                        />
                        )
                    }
                    )
                }
        </div>
                </div>
    )
};

const mapStateToProps = (state) => {
    return {
      myFavorites: state.myFavorites,
    };
  };
  
  export default connect(mapStateToProps, null)(Favorites);
  