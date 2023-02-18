import Timer from './Timer';
import './RestPage.scss'
import BasicButton from './BasicButton';

const RestPage = ({ nextVideo, restData, nextExerciseName }) => {

    return (
        <>
            <div className='container-rest'>
            <div className="message-black1">
                    <h1>Rest</h1>
                    </div>
                <div className='timer-div'>
                    <Timer onTimeout={nextVideo} />
                </div>
                <div
                className = "button-div">
                    <BasicButton
                        option={"Skip to next exercise"}
                        next={nextVideo}
                    />
                    </div>
                <div className="message-black2">
                    Next up
                    </div>
                <div className="message-yellow">
                    {nextExerciseName}
                    </div>


            </div>

        </>

    )
}

export default RestPage;
