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
import LoadModal from "./LoadModal";

function getSavedPlaylists(indexedDB) {
    return new Promise(function(resolve, reject) {
        const dbPromise = indexedDB.open("SavedPlaylists", 1)
        dbPromise.onsuccess = () => {
            const db = dbPromise.result;
            const request = db.transaction("playlists", "readonly")
            .objectStore("playlists")
            .getAll();
            request.onsuccess = (e) => {
                resolve(e);
            }
        }
        dbPromise.onerror = (e) => {
            reject(e);
        }
    })
}

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
    const handleClose = () => setShow(false);

    const [ buttonDisabled, setButtonDisabled ] = useState(true);
    const [ playlists, setPlaylists ] = useState([]);
    useEffect(() => {
        getSavedPlaylists(indexedDB)
        .then(function(e) {
            setPlaylists(e.target.result)
            setButtonDisabled(false);
        })
        .catch(function(e) {
            console.error(e.target.error);
        })
    }, [])

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
                <button
                    onClick={() => setShow(true)}
                    disabled={buttonDisabled}>
                    Load Playlist
                </button>
            </ul>
            <LoadModal
                show={show}
                unshow={handleClose}
                indexedDB={indexedDB}
                playlists={playlists}/>

        </div>
    )

}

export default Welcome;
