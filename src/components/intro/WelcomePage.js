import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DIFFICULTY } from "../utils/constants";
import './WelcomePage.scss';
import { useDispatch } from "react-redux";
import { setNavDirection } from "../../redux/slices/selectSlice";
import { store } from "../../redux/store"
import { initialiseAll } from "../../redux/slices/selectSlice";
import { initialisePlaylist } from "../../redux/slices/playlistSlice";
import LoadModal from "./LoadModal";

const Welcome = ({indexedDB}) => {

    store.dispatch(initialiseAll());
    store.dispatch(initialisePlaylist([]));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const clickHandler = () => {
        dispatch(setNavDirection("forwards"));
        navigate(`/select/${DIFFICULTY}`);
    }

    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    // Modal show unshow hooks
    const [ show, setShow ] = useState(false);
    const [ buttonDisabled, setButtonDisabled ] = useState(true);
    const handleClose = () => setShow(false);

    return (
        <div className="welcome__img-container">
            <ul
                className="welcome__img-ul">
                <img
                    className="welcome__img"
                    src={"/logo.png"}
                    alt={"logo"}
                />
                <button 
                    key={Welcome} 
                    onClick={()=>clickHandler()}
                    className="welcome__button">
                    Start Your Workout
                </button>
                <button
                    onClick={() => setShow(true)}
                    disabled={buttonDisabled}
                    className="welcome__loadbutton">
                    Load Playlist
                </button>
            </ul>
            <LoadModal
                show={show}
                unshow={handleClose}
                indexedDB={indexedDB}
                setButtonDisabled={setButtonDisabled}/>
        </div>
    )
}

export default Welcome;
