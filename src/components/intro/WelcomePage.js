import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DIFFICULTY } from "../utils/constants";
import logo from "../../assets/logo.png";
import './WelcomePage.scss';
import { store } from "../../redux/store"
import { initialiseVersion } from "../../redux/slices/selectSlice";
import { initialisePlaylist } from "../../redux/slices/playlistSlice";

const Welcome = () => {
    store.dispatch(initialiseVersion(1));
    store.dispatch(initialisePlaylist([]));
    const [width, setWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    const clickHandler = () => {
        navigate(`/select/${DIFFICULTY}`);
    }
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (
        <div style={{ display: 'grid', height: '90vh', justifyContent: 'center', placeItems: "center", alignItems: "center"}}>
            <ul
            style={{
                display: "grid",
                //flexWrap:"wrap",
                placeItems: "center",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px", 
                //maxWidth: width > 768 ? "500px":"350px",
                // gridTemplateColumns: width > 768 ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)',
            }}>
                <img
                    style={{
                        paddingLeft: 15,
                        width: width > 768 ? "15rem": width < 500? "10rem": "12rem",
                        height: width > 768 ? "15rem":width < 500? "10rem": "12rem",

                        paddingBottom:"5rem"
                    }}
                    src={logo}
                    alt={"logo"}
                />
           
                <button className='custom-button'
                    key={Welcome} 
                    onClick={()=>clickHandler()}
                    style={{
                        width: width > 768 ? "320px" : width < 500? "200px" : "260px",
                        height: width > 768 ? "6rem": width < 500? "3rem": "4rem",
                        fontSize: width > 768 ? "2rem": width < 500? "1.2rem":"1.5rem",                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        margin: "1rem",
                        textAlign: "center",
                        cursor: "pointer",
                        border: "3px solid black",
                        borderRadius: "20px",
                     
                    }}>
                    Start Your Workout
                </button>
                
            </ul>
        </div>
    )
}

export default Welcome;
