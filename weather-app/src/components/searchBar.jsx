import classes from "../styles/searchBar.module.css";
import {BiSearchAlt} from "react-icons/bi"

const SearchBar = ({city, handleChange, handleSubmit, getLocation}) => {

    return (
        <div className={classes.Container}>
            <div className={classes.Inner}>
            <form onSubmit={handleSubmit}>
                <input type="text" value = {city} className={classes.searchBar} onChange={handleChange}/>
                <button className={classes.button} ><BiSearchAlt/></button>
            </form>
            <button className={classes.buttonSec} onClick={getLocation}>Use My Location</button>

            </div>
        </div>
    )
}

export default SearchBar;