import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Modal.scss'

const EndWorkoutModal = ({show, unshow, endWorkout}) => {

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
                    Continue to End Workout
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="d-flex justify-content-center">
                <button
                        onClick={endWorkout}
                        style = {{color: "black", borderColor: "black", backgroundColor: "#FFE600"}}
                        className="modal__button">
                        Proceed
                </button>
                <button
                        onClick={unshow}
                        style = {{color: "black", borderColor: "black"}}
                        className="modal__button">
                        Go Back
                </button>
            </div>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default EndWorkoutModal