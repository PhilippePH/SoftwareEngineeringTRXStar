import { useDispatch, useSelector } from "react-redux";
import SelectedOptions from "../playlist/SelectedOptions";
import { setMuscles } from "../../redux/slices/selectSlice";
import NavButtons from "../utils/NavButtons";

const SelectMuscles = () => {
    const dispatch = useDispatch()
    const bodyParts = useSelector((state) => (state.select.bodyParts));
    const musclesOptions = {
        "Core": ["Obliques", "Upper abdomen", "Lower abdomen", "Lower back"],
        "Lower Body": ["Glutes", "Quads", "Hamstrings", "Calves"],
        "Upper body": ["Lats", "Back", "Shoulders", "Chest", "Biceps", "Triceps"]
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
                next={null}
            />
        </div>
    )
}

export default SelectMuscles;