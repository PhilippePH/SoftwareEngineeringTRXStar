import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../redux/slices/selectSlice";
import NavButtons from "../layout/NavButtons";
import { useEffect } from "react";
import { DIFFICULTY, FOCUS } from "../utils/constants";
import SelectButton from "../utils/SelectButton";

const SelectDifficulty = () => {
    const dispatch = useDispatch()
    const difficultyOptions = ["easy", "medium", "hard"];
    // useSelector allows us to access the global state - retrieve state with callback function
    const completed = useSelector((state) => (state.select.difficulty))

    useEffect(() => {
        dispatch(setActiveTab(DIFFICULTY));
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%"
            }}
        >
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
                    difficultyOptions?.map((option) => {
                        return (
                            <SelectButton 
                                key={option} 
                                type={DIFFICULTY} 
                                option={option}
                                to={`/select/${FOCUS}`}
                            />
                        )
                    })
                }
            </ul>
            <NavButtons
                prev={null}
                next={`/select/${FOCUS}`}
                completed={completed}
            />
        </div>
    )
}

export default SelectDifficulty;