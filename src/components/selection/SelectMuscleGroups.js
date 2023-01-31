import { useDispatch } from "react-redux";
import SelectedOptions from "../playlist/SelectedOptions";
import { setMuscleGroups } from "../../redux/slices/selectSlice";
import NavButtons from "../utils/NavButtons";

const SelectMuscleGroups = () => {
    const dispatch = useDispatch();
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

    return (
        <div>
            <ul>
                {
                    muscleGroupOptions?.map((muscleGroupOption) => {
                        return (
                            <button key={muscleGroupOption} onClick={() => clickHandler(muscleGroupKey[muscleGroupOption])}>
                                {muscleGroupOption}
                            </button>
                        )

                    })
                }
            </ul>
            <SelectedOptions/>
            <NavButtons
                prev="/select/duration"
                next="/select/muscles"
            />
        </div>
    )
}

export default SelectMuscleGroups;