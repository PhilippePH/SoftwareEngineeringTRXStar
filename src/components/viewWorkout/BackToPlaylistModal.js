import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Modal.scss'

const EndWorkoutModal = ({show, unshow, backToPlaylist}) => {

    return (
        <Modal
            show={show}
            onHide={unshow}
            backdrop="static"
            keyboard={false}
            scrollable={true}
            centered>
            <Modal.Header>
                <Modal.Title
                    className='modal__text'>
                    Continue Back to the Playlist Page
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="d-flex justify-content-center">
                <button
                        onClick={unshow}
                        style = {{color: "black", borderColor: "black"}}
                        className="modal__button">
                        Go Back
                </button>
                <button
                        onClick={backToPlaylist}
                        style = {{color: "black", borderColor: "black", backgroundColor: "#FFE600"}}
                        className="modal__button">
                        Proceed
                </button>
            </div>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default EndWorkoutModal