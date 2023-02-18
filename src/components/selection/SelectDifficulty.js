import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../redux/slices/selectSlice";
import { useEffect, useState } from "react";
import { DIFFICULTY, FOCUS } from "../utils/constants";
import SelectButton from "../utils/SelectButton";
import NavButtons from "../utils/NavButtons";
import './style.scss'


const SelectDifficulty = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const dispatch = useDispatch()
    const difficultyOptions = ["Easy", "Medium", "Hard"];
    
    const completed = useSelector((state) => (state.select.difficulty))

    useEffect(() => {
        dispatch(setActiveTab(DIFFICULTY));
    }, []);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (
        <>
        <div className="category-div">
            DIFFICULTY
        </div>
        <div className="container">
            <div className="left-arrow-div"></div>
            <div className="options-div">
                {difficultyOptions?.map((option) => {
                    return (

                        <SelectButton
                            key={option}
                            type={DIFFICULTY}
                            option={option}
                            to={`/select/${FOCUS}`}
                            selected = {completed} />

                    );
                })}
            </div>
            <div className="right-arrow-div">
                {completed && <NavButtons next={`/select/${FOCUS}`}/>}
            </div>
        </div>
        </>
    )
}

export default SelectDifficulty;