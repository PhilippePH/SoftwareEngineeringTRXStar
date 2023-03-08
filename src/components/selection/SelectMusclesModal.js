import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import SelectMultipleButton from "../utils/SelectMultipleButton";
import './style.scss'
import { useSelector } from "react-redux";
import { MUSCLES } from "../utils/constants";
import { useEffect, useState } from 'react';

const MusclesModal = ({show, unshow}) => {

    const muscleGroups = useSelector((state) => (state.select.muscleGroups));
    const musclesOptions = {
        "Core": ["obliques", "abdomen"],
        "Lower Body": ["glutes", "quads", "hamstrings", "calves"],
        "Upper Body": ["lats", "back", "shoulders", "chest", "biceps", "triceps"]
    };

    const [selected, setSelected] = useState(false);
    const muscles = useSelector((state) => (state.select.muscles));

    useEffect(() => {
        if (muscles.length != 0) {
            setSelected(true);
        }
        else {
            setSelected(false);
        }
    }, [muscles])

    const clickHandler = () => {
        if (selected) {
            unshow();
        }
    }

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
                    className='modal-text'>
                    Deselect Muscles
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="muscles-div">
                    {
                        muscleGroups.map((muscleGroup) => {
                            return ( musclesOptions[muscleGroup]?.map((option) => {
                                return (
                                    <SelectMultipleButton 
                                        key={option} 
                                        type={MUSCLES} 
                                        option={option}
                                        width="5.5rem"
                                        height='3.4rem'
                                        fontSize='0.9rem'
                                    />
                                )
                            })
                        )})
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    onClick={() => clickHandler()}
                    style = {{color: !selected? "darkgray":"", borderColor: selected? "black":"darkgray"}}
                    className="small-button">
                    Save
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default MusclesModal