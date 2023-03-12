import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import { BsDisplay } from 'react-icons/bs';
// import { useSelector } from 'react-redux'
// import { useEffect } from "react";
import { updateRest } from '../../redux/slices/playlistSlice';
import { store } from "../../redux/store"
// import SelectButton from "../utils/SelectButton";
// import { useDispatch } from "react-redux";
// import { setActiveTab } from "../../redux/slices/selectSlice";
import '../selection/style.scss';
// import { Button } from 'react-bootstrap';
import ModalButton from "../utils/ModalButton"
import '../utils/style.scss'

const CogModal = ({show, unshow}) => {


    const [selected30, setSelected30] = useState(false);
    const [selected60, setSelected60] = useState(false);
    const [selected90, setSelected90] = useState(false);
    const [replaceRest, setReplace] = useState(false);
    const [rest, setRest] = useState(-1);

    const [selectedSet30, setSelectedSet30] = useState(false);
    const [selectedSet20, setSelectedSet20] = useState(false);
    const [selectedSet40, setSelectedSet40] = useState(false);
    const [restSet, setRestSet] = useState(-1);

    const restSetTimeHandler20 = (event) => {
        if (!replaceRest) {
            setSelectedSet20(true);
            setSelectedSet30(false);
            setSelectedSet40(false); 
            setRestSet(20);  
        }
    };
    
    const restSetTimeHandler30 = (event) => {
        if (!replaceRest) {
            setSelectedSet30(true);
            setSelectedSet20(false);
            setSelectedSet40(false);
            setRestSet(30);  
        }
    };

    const restSetTimeHandler40 = (event) => {
        if (!replaceRest) {
            setSelectedSet40(true);
            setSelectedSet20(false);
            setSelectedSet30(false);
            setRestSet(40);  
        }
    };

    const restTimeHandler30 = (event) => {
        if (!replaceRest) {
            setSelected30(true);
            setSelected60(false);
            setSelected90(false); 
            setRest(30);  
        }
    };

    const restTimeHandler60 = (event) => {
        if (!replaceRest) {
            setSelected60(true);
            setSelected30(false);
            setSelected90(false);
            setRest(60);  
        }
    };

    const restTimeHandler90 = (event) => {
        if (!replaceRest) {
            setSelected90(true);
            setSelected30(false);
            setSelected60(false);
            setRest(90);  
        }
    };

    // Submit options to redux, updates playlists
    async function handleSubmit(e) {
        
        var replaceForCardio = replaceRest ? 1 : 0;
        console.log("replace cardio", replaceForCardio); 
        console.log("rest", rest); 

        if (selected30 || selected60 || selected90 || selectedSet20 
            || selectedSet30 || selectedSet40)
        {
            store.dispatch(updateRest([rest, replaceForCardio, restSet])); 
        }
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
                className='cog-modal__header'
                closeButton>
                Advanced Settings
            </Modal.Header>
            <Modal.Body>
                    <div className="cog-modal__container">
                        <p 
                            className='cog-modal__container__text'>
                            Select desired rest time between sets:
                        </p>
                        <div className='cog-modal__container__wrapper'>
                            <button
                                className={`cog-modal__button ${selectedSet20 ? "cog-modal__button-active" : ""}`}
                                onClick={() => restSetTimeHandler20()}>
                                {"20 sec"}
                            </button>
                            <button
                                className={`cog-modal__button ${selectedSet30 ? "cog-modal__button-active" : ""}`}
                                onClick={() => restSetTimeHandler30()}>
                                {"30 sec"}
                            </button>
                            <button
                                className={`cog-modal__button ${selectedSet40 ? "cog-modal__button-active" : ""}`}
                                onClick={() => restSetTimeHandler40()}>
                                {"40 sec"}
                            </button>
                        </div>
                        

                        <p
                            className='cog-modal__container__text'>
                            Select desired mid-workout rest time:
                        </p>
                        <div className='cog-modal__container__wrapper'>
                            <button
                                className={`cog-modal__button ${selected30 ? "cog-modal__button-active" : ""}`}
                                onClick={() => restTimeHandler30()}>
                                {"30 sec"}
                            </button>
                            <button
                                className={`cog-modal__button ${selected60 ? "cog-modal__button-active" : ""}`}
                                onClick={() => restTimeHandler60()}>
                                {"60 sec"}
                            </button>
                            <button
                                className={`cog-modal__button ${selected90 ? "cog-modal__button-active" : ""}`}
                                onClick={() => restTimeHandler90()}>
                                {"90 sec"}
                            </button>
                        </div>

                        <p
                            className='cog-modal__container__text'>
                            Replace rest for cardio:
                        </p>
                        <div className='cog-modal__container__wrapper'>
                            <button
                                className={`cog-modal__button ${replaceRest ? "cog-modal__button-active" : ""}`}
                                onClick={(event) => setReplace(true)}>
                                {"Yes"}
                            </button>
                            <button
                                className={`cog-modal__button ${selected90 ? "" : "cog-modal__button-active"}`}
                                onClick={(event) => setReplace(false)}>
                                {"No"}
                            </button>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button 
                        className='cog-modal__save-button'
                        onClick={() => handleSubmit()}>
                        {"Save"}
                    </button>
                </Modal.Footer>
        </Modal>
        </>
    )
}

export default CogModal;