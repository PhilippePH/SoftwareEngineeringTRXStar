import Timer from './Timer';
import './RestPage.scss'
import BasicButton from './BasicButton';
import WorkoutProgress from "./WorkoutProgress";

const RestPage = ({ nextVideo, restData, nextExerciseName, counter, totalWorkoutLength}) => {

    return (
        <>
        <div className='larger-container-rest'>
            <div className='container-rest'>
            <div className='container-rest__progress-bar'> 
                <WorkoutProgress completed={(Math.floor((counter/totalWorkoutLength)*100))} />
            </div>
            <div className="container-rest__message-black1">
                </div>
                <div className="container-rest__message-black1">
                    Rest
                </div>
                <div className='container-rest__timer-div'>
                    <Timer onTimeout={nextVideo} restData = {restData}/>
                </div>
                <div className="container-rest__message-black2">
                    Next up:
                </div>
                <div className="container-rest__message-yellow">
                    {nextExerciseName}
                </div>
                <div
                    className="button-div">
                    <BasicButton
                        option={"Next exercise"}
                        next={nextVideo}
                    />
                </div>
                </div>
            </div>
        </>
    )
}

export default RestPage;
