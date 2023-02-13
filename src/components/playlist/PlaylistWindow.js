import React from 'react'
import './ExerciseCard'
import ExerciseCard from './ExerciseCard';
import NavButtons from '../layout/NavButtons';

import './index.scss'

const PlaylistWindow = () => {

    return (
        <div className='playlist-window'>
              
            <div className='playlist-window__container'> 
            <div className='workout-heading'>WORKOUT 1</div>
                <ExerciseCard />
                <ExerciseCard />
                <ExerciseCard />
                <ExerciseCard />
                <ExerciseCard />
                <ExerciseCard />
                
            </div>
            <NavButtons
            next="/youtube" />
        </div>
       
    );
}

export default PlaylistWindow;