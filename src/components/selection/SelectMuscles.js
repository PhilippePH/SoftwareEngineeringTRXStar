import { useDispatch, useSelector } from "react-redux";
import SelectedOptions from "../playlist/SelectedOptions";
import { setMuscles } from "../../redux/slices/selectSlice";
import NavButtons from "../utils/NavButtons";

const SelectMuscles = () => {
    const dispatch = useDispatch()
    const bodyParts = useSelector((state) => (state.select.muscle_group));
    const musclesOptions = {
        "absCore": ["obliques", "abdomen"],
        "lowerBody": ["glutes", "quads", "hamstrings", "calves"],
        "upperBody": ["lats", "back", "shoulders", "chest", "biceps", "triceps"]
    };


    const clickHandler = (option) => {
        // dispatch allows us to use functions (actions) on global state 
        // E.g.: dispatch setMuscles action with parameter (action.payload) "option"
        dispatch(setMuscles(option));
    }

    return (
        <div>
            <ul>
                {
                    bodyParts.map((bodyPart) => {
                        return ( musclesOptions[bodyPart]?.map((muscleOption) => {
                            return (
                                <button key={muscleOption} onClick={()=>clickHandler(muscleOption)}>
                                    {muscleOption}
                                </button>
                            )
                        })
                    )})
                }
            </ul>
            <SelectedOptions/>
            <NavButtons
                prev="/select/body-part"
                next="/playlist"
            />
        </div>
    )
}

export default SelectMuscles;