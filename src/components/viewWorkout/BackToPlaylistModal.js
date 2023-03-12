import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import './viewWorkout.scss'

const EndWorkoutModal = ({show, unshow, backToPlaylist}) => {

    return (
        <Modal
            show={show}
            onHide={unshow}
            keyboard={false}
            scrollable={true}
            centered>
            <Modal.Header className='confirm-modal__header'>
                <div
                    className='confirm-modal__text'>
                    Continue Back to the Playlist Page
                </div>
            </Modal.Header>
            <Modal.Body>
            <div className="d-flex justify-content-center">
                <button
                    onClick={unshow}
                    className="confirm-modal__button cancel">
                    Cancel
                </button>
                <button
                    onClick={backToPlaylist}
                    className="confirm-modal__button proceed">
                    Confirm
                </button>
            </div>
            </Modal.Body>
        </Modal>
    )
}

export default EndWorkoutModal