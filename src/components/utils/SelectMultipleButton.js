import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMuscleGroups, setMuscles } from "../../redux/slices/selectSlice";
import { MUSCLES, MUSCLE_GROUPS } from "./constants";
import './style.scss';

const selectedStyle = {
    backgroundColor: "yellow",
    border: "1px solid black",
};
const unselectedStyle = {
    backgroundColor: "blue",
    border: "1px solid black",
};

const SelectMultipleButton = ({type, option, width, height, fontSize}) => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(false);

    const {
        muscleGroups,
        muscles
    } = useSelector((state) => (state.select))

    const clickHandler = (type) => {
        switch(type) {
            case MUSCLE_GROUPS:
                dispatch(setMuscleGroups(option));
                setSelected(!selected);
                break;
            case MUSCLES:
                dispatch(setMuscles(option));
                setSelected(!selected);
            
                break;
            default: 
                break;
        }
    }

    useEffect(() => {
        switch(type) {
            case MUSCLE_GROUPS:
                if (muscleGroups.includes(option)) {
                    setSelected(!selected);
                }
                break;
    
            case MUSCLES:
                if (muscles.includes(option)) {
                    setSelected(!selected);
                }
                break;
            default:
                break;
        }
    },[])

    return (
        <button className='mult-button'
            onClick={() => clickHandler(type)}
            style={{
                backgroundColor: selected? "":"whitesmoke",
                width:width,
                height:height,
                paddingTop: "0.5rem",
                paddingbottom: "0.5rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                margin: "1rem",
                textAlign: "center",
                cursor: "pointer",
                //backgroundColor: "yellow",
                border: "2px solid black",
                borderRadius: "8px",
                fontSize: fontSize,
                padding: '10px 20px',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <p
                // style={{
                //     fontSize: "1rem"
                // }}
            >
                {option}
            </p>
            
            
        </button>

    )
}

export default SelectMultipleButton;