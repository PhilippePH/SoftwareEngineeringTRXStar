import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DIFFICULTY } from "../utils/constants";
import logo from "../../assets/logo.png";
import './WelcomePage.scss';
import { useDispatch } from "react-redux";
import { setNavDirection } from "../../redux/slices/selectSlice";
import { store } from "../../redux/store"
import { initialiseAll } from "../../redux/slices/selectSlice";
import { initialisePlaylist } from "../../redux/slices/playlistSlice";

const Welcome = () => {
    store.dispatch(initialiseAll());
    store.dispatch(initialisePlaylist([]));
    const [width, setWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const clickHandler = () => {
        dispatch(setNavDirection("forwards"));
        navigate(`/select/${DIFFICULTY}`);
    }
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (
        <div className="welcome__img-container">
            <ul
            className="welcome__img-ul" 
            >
                <img
                    className="welcome__img"
                    src={logo}
                    alt={"logo"}
                />
           
                <button 
                    key={Welcome} 
                    onClick={()=>clickHandler()}
                    className="welcome__button"
                    >
                    Start Your Workout
                </button>
                
            </ul>
        </div>
    )
}

export default Welcome;
