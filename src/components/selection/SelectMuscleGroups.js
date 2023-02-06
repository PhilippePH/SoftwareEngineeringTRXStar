import { useDispatch } from "react-redux";
import SelectedOptions from "../playlist/SelectedOptions";
import { setActiveTab, setMuscleGroups } from "../../redux/slices/selectSlice";
import NavButtons from "../layout/NavButtons";
import { useEffect } from "react";
import { DURATION, MUSCLES, MUSCLE_GROUPS } from "../utils/constants";
import SelectMultipleButton from "../utils/SelectMultipleButton";

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

    useEffect(() => {
        dispatch(setActiveTab(MUSCLE_GROUPS));
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
                    muscleGroupOptions?.map((option) => {
                        return (
                            <SelectMultipleButton key={option} type={MUSCLE_GROUPS} option={option} />
                        )

                    })
                }
            </ul>
            <SelectedOptions/>
            <NavButtons
                prev={`/select/${DURATION}`}
                next={`/select/${MUSCLES}`}
            />
        </div>
    )
}

export default SelectMuscleGroups;