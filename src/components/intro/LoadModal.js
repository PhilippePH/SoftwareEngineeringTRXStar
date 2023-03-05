import Modal from 'react-bootstrap/Modal'
import { useNavigate } from 'react-router-dom';
import { addPlaylist } from '../../redux/slices/playlistSlice';
import { setDifficulty, setDuration, setFocus, setMuscleGroups, setMuscles } from '../../redux/slices/selectSlice';
import { store } from '../../redux/store';
import './WelcomePage.scss';


const LoadModal = ({show, unshow, playlists}) => {

    const navigate = useNavigate();

    const clickHandler = (playlist) => {
        console.log("Playlist data", playlist.playlist);
        store.dispatch(addPlaylist(playlist.playlist));
        store.dispatch(setDifficulty(playlist.select.difficulty));
        store.dispatch(setFocus(playlist.select.focus));
        store.dispatch(setDuration(playlist.select.duration));
        store.dispatch(setMuscleGroups(playlist.select.muscleGroups));
        store.dispatch(setMuscles(playlist.select.muscles));
        navigate(`/playlist`)
    }

    return (
        <Modal
            show={show}
            onHide={unshow}
            backdrop="static"
            scrollable={false}
            centered>
            <Modal.Body
                className='load-modal'>
                {
                    playlists.map((playlist) => {
                        return (
                            <button
                                key={playlist.name}
                                onClick={() => {clickHandler(playlist)}}
                                className="load-modal__button__playlist">
                                {playlist.name}
                            </button>
                        )
                    })
                }
            </Modal.Body>
            <Modal.Footer>
                <button
                    onClick={unshow}
                    className="load-modal__button__close">
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    )

}

export default LoadModal