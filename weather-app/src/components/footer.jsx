import classes from "../styles/Footer.module.css";
import {AiFillGithub} from "react-icons/ai"

const footer = () => {
    return (
        <div className={classes.Container}>
            By Alex Fernandes 
            <a className={classes.link} href="https://github.com/AlexFernandes04">    <AiFillGithub/></a>
        </div>    )
}

export default footer;