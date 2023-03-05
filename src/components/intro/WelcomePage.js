import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DIFFICULTY } from "../utils/constants";
import './WelcomePage.scss';
import { useDispatch } from "react-redux";
import { setNavDirection } from "../../redux/slices/selectSlice";
import { store } from "../../redux/store"
import { initialiseAll } from "../../redux/slices/selectSlice";
import { initialisePlaylist } from "../../redux/slices/playlistSlice";
import { OverlayTrigger, Popover } from "react-bootstrap";

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
                    src={"/logo.png"}
                    alt={"logo"}
                />
           
                <button 
                    key={Welcome} 
                    onClick={()=>clickHandler()}
                    className="welcome__button"
                    >
                    Start Your Workout
                </button>
                <OverlayTrigger trigger={['click', 'hover']} placement="bottom" overlay={popover}>
                    <button className="welcome__aboutButton"> About </button> 
                </OverlayTrigger>
                
            </ul>
        </div>
    )
}

export default Welcome;


const popover = (
    <Popover id="popover-basic" className="welcome__aboutPopover">
      <Popover.Body className='popover-text'>
        TRX STAR is an exercise app that generates a workout with trx bands based on your specific wants and needs. Simply select your preferences and let us create a curated playlist for you! 
      </Popover.Body>
    </Popover>
);