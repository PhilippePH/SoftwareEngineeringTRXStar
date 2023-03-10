import Modal from 'react-bootstrap/Modal'
import { useSelector } from 'react-redux'
import { updateRest } from '../../redux/slices/playlistSlice';
import { store } from "../../redux/store"


const CogModal = ({show, unshow}) => {

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries())["restTime"];

        const replaceForCardio = 1; // Here replace this for whether replace cardio has been clicked some use state or smth
        store.dispatch(updateRest([data, replaceForCardio])); 
        unshow(); 
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
                    
                    <div className="cog-modal__container__parent1">
                        {/* EDITING REST TIME */}
                        <label 
                            htmlFor="pname"
                            className='cog-modal__container__parent1__rest-text'>
                            Edit desired rest time:
                        </label>
                            <input 
                                id="pname"
                                name="restTime"
                                className='cog-modal__container__parent1__input'
                                placeholder="90" // HERE WE NEED THE CURRENT REST TIME PASSED IN AS INPUT
                                autoFocus
                                // optional
                                />
                            <p className='cog-modal__container__parent1__seconds'> sec </p>
                    </div>

                        {/* EDITING REST SET TIME
                        <div className="cog-modal__container__parent2">
                        <label 
                            htmlFor="pname"
                            className='cog-modal__container__parent2__set-text'>
                            Edit desired rest time between sets:
                        </label>
                            <input 
                                id="pname"
                                name="restTime"
                                className='cog-modal__container__parent2__input'
                                placeholder="20" // HERE WE NEED THE CURRENT REST TIME PASSED IN AS INPUT
                                autoFocus
                                optional
                                />
                            <p className='cog-modal__container__parent2__seconds'> sec </p>
                        </div> */}

                        {/* CARDIO TOGGLE */}
                        {/* <label 
                            htmlFor="pname"
                            className='cog-modal__cardio-text'>
                            Replace some rests with cardio:
                        </label>
                        <div className="cog-modal__parent3">
                            {/* ADD THE TOGGLE FIELD HERE}
                        </div> */}


                    {/* Deal with errors here */}
                    {/* <p 
                        id="msg"
                        className='cog-modal__error'>
                        Please enter a positive value
                    </p> */}
                    
                    
                    {/* Save */}
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