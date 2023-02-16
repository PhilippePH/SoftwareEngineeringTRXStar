import React from 'react'
import './ExerciseCard'
import ExerciseCard from './ExerciseCard';
import NavButtons from '../utils/NavButtons';

import './PlaylistWindow.scss'

const PlaylistWindow = () => {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    const playlist = useSelector((state) => (state.playlist.playlistData));



    return (
        <div>
        <div className='playlist-window'>
               
            <div className='playlist-window__container'>
                <div className='workout-heading'>WORKOUT 1</div>
                <div>
                    {
                        playlist.map((work, index) => {
                            if (playlist[index].type == "cooldown")
                            return (
                                <ExerciseCard exercise_name='Cooldown' />
                            )
                            while ((index+1) < playlist.length) {
                                if (playlist[index+1].type == "rest"){
                                    return (<ExerciseCard exercise_name={playlist[index].exercise_name} />)
                                }
                                else if (playlist[index].type == "exercise") {
                                    return (
                                        <div>
                                            <ExerciseCard exercise_name={playlist[index].exercise_name} />
                                            <RestCard time={playlist[index].rest_set} />
                                        </div>


                                    )
                                }
                                else if (playlist[index].type == "warmup")
                                    return (

                                        <ExerciseCard exercise_name='Warmup' />
                                    )
                                
                                else
                                    return (
                                        <RestCard time={playlist[index].time} />
                                    )
                            }
                        })

                    }
                </div>
            </div>
            
        </div>
        <div
            style={{
                display:"flex",
                placeItems: "center",
                justifyContent: "center",
                paddingTop:"2%",
                alignItems: "center",
            }}>
            <FaPlay 
                style={{
                    // borderRadius: "8px"
                    fontSize:"50px",
                    cursor: "pointer"
                }}
                onClick={() => { navigate("/youtube") }}
                />
        </div>
        {/* <NavButtons
                next="/youtube" /> */}
        </div>
    );

}
export default PlaylistWindow;