import Modal from 'react-bootstrap/Modal'
import { Navigate, useNavigate } from 'react-router-dom';
import { addPlaylist } from '../../redux/slices/playlistSlice';
import { store } from '../../redux/store';

const LoadModal = ({show, unshow, indexedDB, playlists}) => {

    console.log("Playlist in modal", playlists);

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
            <Modal.Body>
                {
                    playlists.map((playlist) => {
                        return (
                            <button
                                key={playlist.name}
                                onClick={() => {clickHandler(playlist)}}>
                                {playlist.name}
                            </button>
                        )
                    })
                }
            </Modal.Body>
            <Modal.Footer>
                <button
                    onClick={unshow}>
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    )

}

export default LoadModal