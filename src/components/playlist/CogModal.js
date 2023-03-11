import Modal from 'react-bootstrap/Modal'
import { useSelector } from 'react-redux'
import { useEffect } from "react";
import { updateRest } from '../../redux/slices/playlistSlice';
import { store } from "../../redux/store"
import SelectButton from "../utils/SelectButton";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../redux/slices/selectSlice";
import '../selection/style.scss';
import { Button } from 'react-bootstrap';

const CogModal = ({show, unshow}) => {

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const rest = Object.fromEntries(formData.entries())["restTime"];
        const cardio = Object.fromEntries(formData.entries())["cardio"];

        // Replace for cardio only when true
        var replaceForCardio = (cardio == "Yes");

        store.dispatch(updateRest([rest, replaceForCardio])); 
        unshow(); 
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
                            className='cog-modal__container__rest-text'>
                            Select desired rest time:
                        </label>
                        <div className='cog-modal__container__rest-text__input'>
                            <input 
                                type="radio"
                                id="30sec"
                                name="rest"
                                // className='cog-modal__container__rest-text__rest-text'
                                value="30"
                                />
                            <label
                                // className='cog-modal__container__rest-text__rest-text'
                                for = "30sec">
                                    30 sec
                                </label>

                            <input 
                                type="radio"
                                id="60sec"
                                name="rest"
                                // className='cog-modal__container__rest-text__rest-text'
                                value="60"
                                />
                            <label
                                // className='cog-modal__container__rest-text__rest-text'
                                for = "60sec">
                                    60 sec
                                    
                                </label>

                            <input 
                                type="radio"
                                id="90sec"
                                name="rest"
                                // className='cog-modal__container__rest-text__rest-text'
                                value="90"
                                />
                            <label
                                // className='cog-modal__container__rest-text__rest-text'
                                for = "90sec">
                                    90 sec
                                </label>

                            <input 
                                type="radio"
                                id="120sec"
                                name="rest"
                                // className='cog-modal__container__rest-text__rest-text'
                                value="120"
                                />
                            <label
                                // className='cog-modal__container__rest-text__rest-text'
                                for = "120sec">
                                    120 sec
                                </label>
                        </div>

                        <label 
                            htmlFor="pname"
                            className='cog-modal__container__cardio-text'>
                            Replace mid-workout rest with cardio                        
                            </label>
                        <div className='cog-modal__container__cardio-text__input'>
                            <input 
                                type="radio"
                                id="yes"
                                name="cardio"
                                value="Yes"
                                />
                            <label
                                for = "yes">
                                    Yes
                                </label>

                            <input 
                                type="radio"
                                id="no"
                                name="cardio"
                                value="No"
                                />
                            <label
                                for = "no">
                                    No
                                </label>
                        </div>

                    <button 
                        type="submit"
                        className='save-modal__button'>
                        <p className='save-modal__buttontext'>
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