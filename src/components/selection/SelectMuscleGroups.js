import { useDispatch, useSelector } from "react-redux";
import { setActiveTab, } from "../../redux/slices/selectSlice";
import NavButtons from "../utils/NavButtons";
import { useEffect, useState } from "react";
import { FOCUS, MUSCLE_GROUPS } from "../utils/constants";
import SelectMultipleButton from "../utils/SelectMultipleButton";
import MusclesModal from "./SelectMusclesModal"
import './selection.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { OverlayTrigger, Popover } from "react-bootstrap";
import { RiInformationFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";


const SelectMuscleGroups = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const completed = useSelector((state) => (state.select.muscleGroups));
    const direction = useSelector((state) => (state.select.navDirection));
    
    const muscleGroupOptions = [
        "Core",
        "Lower Body",
        "Upper Body",
    ];

    const clickHandler = () => {
        if (completed.length != 0) {
            setShow(true);
        }
    }

    useEffect(() => {
        dispatch(setActiveTab(MUSCLE_GROUPS));
    }, []);

    return (
        <>
        <MusclesModal
            show={show}
            unshow={handleClose}/>
        <div className="title">
            <div className="title__wrapper"/>
            <div className="title__text" > Muscle Group(s) </div>
            <OverlayTrigger 
                trigger={['hover', 'focus', 'click']} 
                placement="top" overlay={popover}>
                <div className="title__wrapper">
                    <RiInformationFill className='title__icon'/>
                </div>  
            </OverlayTrigger>
        </div>
        <div className="selection-container">
            <div className="selection-container__left">
                <NavButtons prev={`/select/${FOCUS}`}/>
            </div>
            <div 
                className="selection-container__options-muscles"
                style={{
                    animation: (direction=="forwards")? "slide-in-right 0.5s forwards":"slide-in-left 0.5s forwards",   
                }}>
                {
                    muscleGroupOptions?.map((option) => {
                        return (
                            <SelectMultipleButton 
                                key={option} 
                                type={MUSCLE_GROUPS} 
                                option={option} 
                                width="8rem"
                                height='4rem'
                                fontSize='1rem'
                            />
                        )

                    })
                }
                <button
                    onClick={clickHandler}
                    className="selection-container__button"
                    style={{borderColor: completed.length != 0? "black":"darkgray"}}>
                    <p
                        style={{color: completed.length != 0? "black":"darkgray", }}>
                        Specify Muscles
                    </p>
                </button>
            </div>
            <div className="selection-container__right"/>
        </div>
        <div className='generate__div'>
            {completed.length!=0 && 
            <button className="generate__button"
                style={{
                    animation: "slide-in-bottom 1s forwards",   
                }}
                onClick={() => {navigate("/playlist") }}
            
            >
                Generate Workout
            </button>
            }
        </div>

        </>
    )
}

export default SelectMuscleGroups;

const popover = (
    <Popover id="popover-basic" className="popover__display">
        <Popover.Body className='popover__text'>
            The muscle groups determine the muscles your workout will train. 
            If you wish to modify the specific muscles you 
            want to train, press <strong>"Advanced"</strong>.
            <ul>
            <li>Core: Trains obliques and the abdomen.</li>
            <li>Lower Body: Trains glutes, quads, hamstrings and calves.</li>
            <li>Upper Body: Trains lats, the back, shoulders, the chest, biceps and triceps.</li>
            </ul>
        </Popover.Body>
    </Popover>
);