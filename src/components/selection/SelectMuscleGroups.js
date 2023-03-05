import { useDispatch, useSelector } from "react-redux";
import { setActiveTab, setMuscleGroups } from "../../redux/slices/selectSlice";
import NavButtons from "../utils/NavButtons";
import { useEffect, useState } from "react";
import { DURATION, FOCUS, MUSCLES, MUSCLE_GROUPS } from "../utils/constants";
import SelectMultipleButton from "../utils/SelectMultipleButton";
import ModalButton from "../utils/ModalButton"
import MusclesModal from "./SelectMusclesModal"
import './style.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { OverlayTrigger, Popover } from "react-bootstrap";
import { AiFillInfoCircle } from "react-icons/ai";


const modal = document.querySelector(".modal");
console.log("Modal", modal)
const overlay = document.querySelector(".overlay");

const SelectMuscleGroups = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [width, setWidth] = useState(window.innerWidth);
    const dispatch = useDispatch();
    const completed = useSelector((state) => (state.select.muscleGroups));
    const direction = useSelector((state) => (state.select.navDirection));
    const muscleGroupKey = {
        "Core": "absCore",
        "Lower Body": "lowerBody",
        "Upper Body": "upperBody",
    };
    const muscleGroupOptions = [
        "Core",
        "Lower Body",
        "Upper Body",
    ];

    const clickHandler = (option) => {
        dispatch(setMuscleGroups(option));
    }

    useEffect(() => {
        dispatch(setActiveTab(MUSCLE_GROUPS));
    }, []);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

   
    return (
        <>
        <MusclesModal
            show={show}
            unshow={handleClose}/>
        <div className="title-div">
            <div className="info-wrapper"/>
            <div className="title-text" > Muscle Group(s) </div>
            <OverlayTrigger trigger={['click','hover']} placement="top" overlay={popover}>
                <div className="info-wrapper">
                    <AiFillInfoCircle className='info-icon' size={20} />
                </div>  
            </OverlayTrigger>
            
        </div>
        <div className="selection-container">
            <div className="left-arrow-div">
                <NavButtons prev={`/select/${FOCUS}`}/>
            </div>
            <div 
                className="options-div"
                style={{
                    animation: (direction=="forwards")? "slide-in-right 0.5s forwards":"slide-in-left 0.5s forwards",   
                }}
            >
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
                <ModalButton 
                    showModal={setShow}
                    text={"Advanced"}
                />
            </div>
            <div className="right-arrow-div">
                {completed.length!=0 && <NavButtons next="/playlist"/>}
            </div>
        </div>
        </>
    )
}

export default SelectMuscleGroups;

const popover = (
    <Popover id="popover-basic" className="popover-display">
      <Popover.Body className='popover-text'>
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