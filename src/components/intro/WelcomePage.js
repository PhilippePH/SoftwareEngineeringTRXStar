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
import { OverlayTrigger, Popover } from "react-bootstrap";
import { RiInformationFill } from "react-icons/ri";

const Welcome = ({indexedDB}) => {

    useEffect(() => {
        store.dispatch(initialiseAll());
        store.dispatch(initialisePlaylist([]));
    })
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
                <div className="welcome__load-button-div">
                    <div className = 'welcome__load-button-wrapper'></div>
                    <button
                        onClick={() => setShow(true)}
                        disabled={buttonDisabled}
                        className="welcome__loadbutton">
                        Load Playlist
                    </button>
                    <OverlayTrigger 
                        trigger={[ 'click','hover','focus']} 
                        placement="bottom" overlay={popover}>
                        <div className="welcome__load-button-wrapper">
                            <RiInformationFill className='welcome__info-icon'/>
                        </div>  
                    </OverlayTrigger>
                </div>
                
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

const popover = (
    <Popover id="popover-basic" className="popover__display">
      <Popover.Body className='popover__text'>
        Load and navigate straight to a playlist you've saved. To save a playlist click the 'Save Workout' button after completing a workout.
      </Popover.Body>
    </Popover>
);
