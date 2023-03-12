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

    async function handleSubmit(e) {
        // const cardio = Object.fromEntries(formData.entries())["cardio"];

        // Replace for cardio only when true
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
                className='save-modal__header'
                closeButton>
            </Modal.Header>
            <Modal.Body>
                    <div className="cog-modal__container">
                    <label 
                            htmlFor="pname"
                            className='cog-modal__container__rest-text'>
                            Select desired rest time between sets:
                        </label>
                        <div className='cog-modal__container__rest-text__input'>
                            <div className='cog-modal__container__rest-text__choice'>
                                <button
                                    className={selectedSet20 && !selectedSet30 && !selectedSet40 && !replaceRest ? 'cog-modal__button-selected' : 'cog-modal__button-unselected'}
                                    style = {{ width: ""}}
                                    onClick={() => restSetTimeHandler20()}>
                                    {"20 sec"}
                                </button>
                                <button
                                    className={selectedSet30 && !selectedSet20 && !selectedSet40 && !replaceRest  ? 'cog-modal__button-selected' : 'cog-modal__button-unselected'}
                                    onClick={() => restSetTimeHandler30()}>
                                    {"30 sec"}
                                </button>
                                <button
                                    className={selectedSet40  && !selectedSet20 && !selectedSet30 && !replaceRest  ? 'cog-modal__button-selected' : 'cog-modal__button-unselected'}
                                    onClick={() => restSetTimeHandler40()}>
                                    {"40 sec"}
                                </button>
                            </div>
                        </div>
                        

                        <label 
                            htmlFor="pname"
                            className='cog-modal__container__rest-text'>
                            Select desired mid-workout rest time:
                        </label>
                        <div className='cog-modal__container__rest-text__input'>
                            <div className='cog-modal__container__rest-text__choice'>
                                <button
                                    className={selected30 && !selected60 && !selected90 && !replaceRest ? 'cog-modal__button-selected' : 'cog-modal__button-unselected'}
                                    style = {{ width: ""}}
                                    onClick={() => restTimeHandler30()}>
                                    {"30 sec"}
                                </button>
                                <button
                                    className={selected60 && !selected30 && !selected90 && !replaceRest  ? 'cog-modal__button-selected' : 'cog-modal__button-unselected'}
                                    onClick={() => restTimeHandler60()}>
                                    {"60 sec"}
                                </button>
                                <button
                                    className={selected90  && !selected30 && !selected60 && !replaceRest  ? 'cog-modal__button-selected' : 'cog-modal__button-unselected'}
                                    onClick={() => restTimeHandler90()}>
                                    {"90 sec"}
                                </button>
                            </div>
                        </div>

                        <label
                            htmlFor="pname"
                            className='cog-modal__container__rest-text'>
                            Replace rest for cardio:
                        </label>
                        <div className='cog-modal__container__rest-text__input'>
                            <div className='cog-modal__container__rest-text__choice'>
                            <button
                                className={replaceRest ? 'cog-modal__button-selected' : 'cog-modal__button-unselected'}
                                style={{ width: "" }}
                                onClick={(event) => setReplace(true)}>
                                {"Yes"}
                            </button>
                            <button
                                className={!replaceRest ? 'cog-modal__button-selected' : 'cog-modal__button-unselected'}
                                style={{ width: "" }}
                                onClick={(event) => setReplace(false)}>
                                {"No"}
                            </button>
                            </div>
                        </div>
                    
                    <button 
                        className='save-modal__button'
                        onClick={() => handleSubmit()}>
                            {"Save"}
    
                    </button>
                    </div>
                </Modal.Body>
        </Modal>
        </>
    )
}

export default CogModal;