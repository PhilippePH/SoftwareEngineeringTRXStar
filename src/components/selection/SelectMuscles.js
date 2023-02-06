import { useDispatch, useSelector } from "react-redux";
import SelectedOptions from "../playlist/SelectedOptions";
import { setActiveTab, setMuscles } from "../../redux/slices/selectSlice";
import NavButtons from "../layout/NavButtons";
import { useEffect } from "react";
import { MUSCLES, MUSCLE_GROUPS } from "../utils/constants";
import SelectMultipleButton from "../utils/SelectMultipleButton";

const SelectMuscles = () => {
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

    return (
        <div>
            <ul
                style={{
                    display: "grid",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    padding: "0px"
                }}
            >
                {
                    muscleGroups.map((muscleGroup) => {
                        return ( musclesOptions[muscleGroup]?.map((option) => {
                            return (
                                <SelectMultipleButton key={option} type={MUSCLES} option={option}/>
                            )
                        })
                    )})
                }
            </ul>
            <SelectedOptions/>
            <NavButtons
                prev={`/select/${MUSCLE_GROUPS}`}
                next="/playlist"
            />
        </div>
    )
}

export default SelectMuscles;