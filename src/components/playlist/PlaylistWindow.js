import React from 'react'
import './ExerciseCard'
import ExerciseCard from './ExerciseCard';

import './index.scss'

const PlaylistWindow = () => {

    return (
        <div className='playlist-window'>
            <div className='playlist-window__container'>
                <ExerciseCard />
                <ExerciseCard />
                <ExerciseCard />
            </div>
        </div>
    );
}

export default PlaylistWindow;