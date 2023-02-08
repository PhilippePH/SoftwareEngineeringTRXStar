import { useDispatch, useSelector } from "react-redux";
import SelectedOptions from "../playlist/SelectedOptions";
import { setActiveTab, setMuscles } from "../../redux/slices/selectSlice";
import NavButtons from "../layout/NavButtons";
import { useEffect, useState } from "react";
import { MUSCLES, MUSCLE_GROUPS } from "../utils/constants";
import SelectMultipleButton from "../utils/SelectMultipleButton";

const SelectMuscles = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const dispatch = useDispatch()
    const muscleGroups = useSelector((state) => (state.select.muscleGroups));
    const musclesOptions = {
        "Core": ["obliques", "abdomen"],
        "Lower Body": ["glutes", "quads", "hamstrings", "calves"],
        "Upper Body": ["lats", "back", "shoulders", "chest", "biceps", "triceps"]
    };


    const clickHandler = (option) => {
        // dispatch allows us to use functions (actions) on global state 
        // E.g.: dispatch setMuscles action with parameter (action.payload) "option"
        dispatch(setMuscles(option));
    }

    useEffect(() => {
        dispatch(setActiveTab(MUSCLES));
    }, []);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (
        <div style={{ display: 'grid', height: '50vh', justifyContent: 'center', placeItems: "center", alignItems: "center"}}>
            DESELECT MUSCLES YOU DON'T WANT TO TRAIN
            <ul
                style={{
                    display: "grid",
                    placeItems: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50%",
                    padding: "0px",
                    // maxWidth: "25rem",
                    gridTemplateColumns: width > 768 ? "maxWidth:'25rem'":"maxWidth:'10rem'",
                    gridTemplateColumns: width > 768 ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)',
                    //backgroundColor:"red",
                    gridGap: '16px',
                }}
            >
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
            </ul>
            {/* <SelectedOptions/> */}
            <NavButtons
                prev={`/select/${MUSCLE_GROUPS}`}
                next="/playlist"
            />
        </div>
    )
}

export default SelectMuscles;