import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../redux/slices/selectSlice";
import { useEffect, useState } from "react";
import { DIFFICULTY, FOCUS } from "../utils/constants";
import SelectButton from "../utils/SelectButton";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './selectDifficulty.scss';


const SelectDifficulty = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const dispatch = useDispatch()
    const difficultyOptions = ["easy", "medium", "hard"];
    
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
        <div className="selection-div" > 
        
            DIFFICULTY

            <ul className="difficulty-list" >
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
        </div>
    )
}

export default SelectDifficulty;