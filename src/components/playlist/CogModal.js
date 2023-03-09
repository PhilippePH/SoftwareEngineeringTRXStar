import Modal from 'react-bootstrap/Modal'
import { useSelector } from 'react-redux'
import { updateRest } from '../../redux/slices/playlistSlice';
import { store } from "../../redux/store"
// import './playlist.scss'


const CogModal = ({show, unshow}) => {

    async function handleSubmit(time) {
        updateRest(time);   
        // data validation -- non negative numbers?   
    }

    return (
        <> 
        <Modal
            show={show}
            onHide={unshow}
            scrollable={false}
            centered>
            <Modal.Header 
                className='save-modal__header'
                closeButton>
            </Modal.Header>
            <Modal.Body>
                <form 
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    className="cog-modal__container">
                    <label 
                        htmlFor="pname"
                        className='cog-modal__text'>
                        Edit desired rest time:
                    </label>
                    <div className="cog-modal__parent">
                        <input 
                            id="pname"
                            name="restTime"
                            className='cog-modal__parent__input'
                            placeholder="e.g. 90" // HERE WE NEED THE CURRENT REST TIME PASSED IN AS INPUT
                            autoFocus
                            optional
                            />
                        <p className='cog-modal__parent__seconds'> sec </p>
                    </div>
                    {/* <p 
                        id="msg"
                        className='cog-modal__error'>
                        Please enter a positive value
                    </p> */}
                    <button 
                        type="submit"
                        className='cog-modal__button'>
                        <p className='cog-modal__buttontext'>
                            Save
                        </p>
                    </button>
                </form>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default CogModal;