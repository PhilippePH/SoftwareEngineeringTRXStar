import Modal from 'react-bootstrap/Modal'
import { useNavigate } from 'react-router-dom';
import { addPlaylist } from '../../redux/slices/playlistSlice';
import { store } from '../../redux/store';
import './WelcomePage.scss';


const LoadModal = ({show, unshow, playlists}) => {

    const navigate = useNavigate();

    const clickHandler = (playlist) => {
        console.log("Playlist data", playlist.playlist);
        store.dispatch(addPlaylist(playlist.playlist));
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