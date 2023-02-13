import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { DIFFICULTY } from "../utils/constants";
import playlist_to_clipList from './playlist_to_clipList';

const RestPage = () => {
    const playlist = useSelector((state) => (state.playlist));
    var clipList = playlist_to_clipList(playlist); 
    console.log("clip list", clipList); 

    return (
        <>
            <h1>Rest page</h1>
        </>

    )
}

export default RestPage;