import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { DIFFICULTY } from "../utils/constants";
import playlist_to_clipList from './playlist_to_clipList';
import Timer from './Timer';
import './RestPage.css'

const RestPage = () => {
    const playlist = useSelector((state) => (state.playlist));
    var clipList = playlist_to_clipList(playlist); 

    console.log("clip list", clipList); 

    return (
        <>
            <div className="message1">
                <h1>Next up</h1>
                </div>
                <div className="message2">
                <h1>Hamstring curl</h1>
            </div>
            <div className="App">
                <Timer onTimeout={handleTimeout} />
            </div>


        </>

    )
}

function handleTimeout() {
    console.log("Timer reached 0");
  }

export default RestPage;