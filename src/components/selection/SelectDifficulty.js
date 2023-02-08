import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../redux/slices/selectSlice";
import NavButtons from "../layout/NavButtons";
import { useEffect, useState } from "react";
import { DIFFICULTY, FOCUS } from "../utils/constants";
import SelectButton from "../utils/SelectButton";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const SelectDifficulty = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const dispatch = useDispatch()
    const difficultyOptions = ["easy", "medium", "hard"];
    // useSelector allows us to access the global state - retrieve state with callback function
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
        <div style={{ display: 'grid', height: '50vh', justifyContent: 'center', placeItems: "center", alignItems: "center",}}
        > DIFFICULTY
            <ul
                style={{
                    display: "grid",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    padding: "0px",
                    gridTemplateColumns: width > 768 ? 'repeat(3, 1fr)' : '1fr',
                    gridGap: '16px'
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