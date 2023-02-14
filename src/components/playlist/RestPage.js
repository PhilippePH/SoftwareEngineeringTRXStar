import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { DIFFICULTY } from "../utils/constants";
import playlist_to_clipList from './playlist_to_clipList';
import Timer from './Timer';
import './RestPage.css'
import { Link } from 'react-router-dom';
import BasicButton from './BasicButton';

const RestPage = ({nextVideo, restData}) => {

    return (
        <>
            <div className="message1">
                <h1>Next up</h1>
                </div>
                <div className="message2">
                <h1>Hamstring curl</h1>
            </div>
            <div className="RestPage">
                <Timer onTimeout={nextVideo} />
                    <BasicButton
                        option={"Skip to next exercise"}
                        next = {nextVideo}
                        />
            </div>


        </>

    )
}

export default RestPage;
