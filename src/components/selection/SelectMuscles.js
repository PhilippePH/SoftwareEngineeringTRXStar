import { useDispatch, useSelector } from "react-redux";
import { setActiveTab, setMuscles } from "../../redux/slices/selectSlice";
import NavButtons from "../utils/NavButtons";
import { useEffect, useState } from "react";
import { MUSCLES, MUSCLE_GROUPS } from "../utils/constants";
import SelectMultipleButton from "../utils/SelectMultipleButton";
import './style.scss'



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
        <>
        <div className="category-div">
            DESELECT MUSCLES YOU DON'T WANT TO TRAIN
        </div>
        <div className="container">
            <div className="left-arrow-div">
                <NavButtons prev={`/select/${MUSCLE_GROUPS}`}/>
            </div>
            <div className="muscles-div">
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
            </div>
            <div className="right-arrow-div">
                <NavButtons  next="/playlist"/>
            </div>
        </div>
        </>
        // <div style={{ display: 'grid', height: '50vh', justifyContent: 'center', placeItems: "center", alignItems: "center"}}>
        //     DESELECT MUSCLES YOU DON'T WANT TO TRAIN
        //     <ul
        //         style={{
        //             display: "flex",
        //             flexWrap:"wrap",
        //             placeItems: "center",
        //             justifyContent: "center",
        //             alignItems: "center",
        //             padding: "0px", 
        //             maxWidth: width > 768 ? "500px":"350px",
        //             // gridTemplateColumns: width > 768 ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)',
        //             gridGap: '16px',
        //         }}
        //     >
        //         {
        //             muscleGroups.map((muscleGroup) => {
        //                 return ( musclesOptions[muscleGroup]?.map((option) => {
        //                     return (
        //                         <SelectMultipleButton 
        //                             key={option} 
        //                             type={MUSCLES} 
        //                             option={option}
        //                             width="5.5rem"
        //                             height='3.4rem'
        //                             fontSize='0.9rem'
        //                         />
        //                     )
        //                 })
        //             )})
        //         }
        //     </ul>
        //     <div
        //         style={{
        //             display:"flex",
        //             placeItems: "center",
        //             justifyContent: "center",
        //             alignItems: "center",
        //             width:"150%",
        //         }}
                
        //         >
        //             <div
        //                 style={{
        //                     display:"flex",
        //                     placeItems: "center",
        //                     justifyContent: "center",
        //                     alignItems: "center",
        //                     width:"50%",
        //                 }} >
        //                 <NavButtons
        //                     prev={`/select/${MUSCLE_GROUPS}`}
        //                 />
        //             </div>

        //             <div
        //                 style={{
        //                     display:"flex",
        //                     placeItems: "center",
        //                     justifyContent: "center",
        //                     alignItems: "center",
        //                     width:"50%",
        //                 }}>
        //                 <NavButtons
        //                     next="/playlist"
        //                 />
        //             </div>
               
        //     </div>
        // </div>
    )
}

export default SelectMuscles;