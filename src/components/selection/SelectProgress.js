import { useDispatch, useSelector } from "react-redux";
import { DIFFICULTY, DURATION, FOCUS, MUSCLES, MUSCLE_GROUPS } from "../utils/constants";
import './style.scss'
import { useNavigate } from 'react-router-dom';
import { GiJumpingRope,GiWeightLiftingUp} from "react-icons/gi";
import {BiRun} from "react-icons/bi"
import {GrYoga} from "react-icons/gr"
import {WiTime12,WiTime6,WiTime3,WiTime9} from "react-icons/wi"
import {TbAntennaBars3,TbAntennaBars4,TbAntennaBars5} from "react-icons/tb"
import { setNavDirection } from "../../redux/slices/selectSlice";

const SelectProgress = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const optionIcons = {
        "15 min": WiTime3, 
        "30 min": WiTime6,
        "45 min": WiTime9,
        "60 min": WiTime12,
        "HIIT": GiJumpingRope, 
        "Strength": GiWeightLiftingUp, 
        "Endurance": BiRun, 
        "Recovery": GrYoga,
        "Easy": TbAntennaBars3, 
        "Medium": TbAntennaBars4, 
        "Hard": TbAntennaBars5,
        "Core": "C",
        "Lower Body":"L",
        "Upper Body":"U",

        
    };

    const activeTab = useSelector((state) => (state.select.activeTab));
    const selectedDifficulty = useSelector((state) => (state.select.difficulty));
    const selectedFocus = useSelector((state) => (state.select.focus));
    const selectedDuration = useSelector((state) => (state.select.duration));
    const selectedMuscleGroup = useSelector((state) => (state.select.muscleGroups));

    const clickHandler = (to) => {
        if(activeTab==DIFFICULTY){
            dispatch(setNavDirection("forwards"));
        }
        else if(activeTab==MUSCLE_GROUPS){
            dispatch(setNavDirection("backwards"));
        }
        else if(activeTab==DURATION){
            if(to==DIFFICULTY){
                dispatch(setNavDirection("backwards"));
            }
            else{
                dispatch(setNavDirection("forwards"));
            }
        }
        else if(activeTab==FOCUS){
            if(to==MUSCLE_GROUPS){
                dispatch(setNavDirection("forwards"));
            }
            else{
                dispatch(setNavDirection("backwards"));
            }
        }

        if(to != activeTab){
            navigate(`/select/${to}`);
        }
        
    }

    return (
        <div className="progress-container">
            <div className="progress-text">
                {"Select your preferences"}
            </div>
            <div className="tab-container">
                <div className={activeTab==DIFFICULTY?"active-tab":"inactive-tab"}
                     onClick ={() => {selectedDifficulty && clickHandler(DIFFICULTY)}}
                >
                    {selectedDifficulty && <Icon icon={optionIcons[selectedDifficulty]} />}
                </div>
                <div className={activeTab==DURATION?"active-tab":"inactive-tab"}
                    onClick ={() => {selectedDuration && clickHandler(DURATION)}}
                    //  onClick={() => { navigate(`/select/${DURATION}`) }}
                     >
                    {selectedDuration && <Icon icon={optionIcons[selectedDuration]} />}
                </div>
                <div className={activeTab==FOCUS?"active-tab":"inactive-tab"}
                    onClick ={() => {selectedFocus && clickHandler(FOCUS)}}
                    //  onClick={() => { navigate(`/select/${FOCUS}`) }}
                     >
                    {selectedFocus && <Icon icon={optionIcons[selectedFocus]} />}
                </div>
                <div className={activeTab==MUSCLE_GROUPS?"active-tab":"inactive-tab"}
                    onClick ={() => {selectedMuscleGroup.length!=0 && clickHandler(MUSCLE_GROUPS)}}
                     > 
                     <div className="muscleGroup-bar">
                        {
                        selectedMuscleGroup?.map((muscleGroup) => {
                            return (
                                <div className = "muscleGroup-bar-text">
                                    {optionIcons[muscleGroup]}
                                </div>
                            )
    
                        })}
                    </div>
                </div>
                {/* <div className={activeTab==MUSCLES?"active-tab":"inactive-tab"}/> */}
            </div>
        </div>
    )
}

export default SelectProgress;

const Icon = ({ icon }) => {
    const IconComponent = icon;
    return <IconComponent className ="icon"/>;
};