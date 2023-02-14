import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { DIFFICULTY } from "../utils/constants";
import playlist_to_clipList from './playlist_to_clipList';
import Timer from './Timer';

const RestPage = ({nextVideo, restData}) => {

    return (
        <>
            <h1>Rest page</h1>
            <div className="App">
                <Timer onTimeout={nextVideo} />
            </div>


        </>

    )
}

export default RestPage;