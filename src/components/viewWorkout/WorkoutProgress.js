import ProgressBar from 'react-bootstrap/ProgressBar';


const WorkoutProgress = () => {
  return(
    <div className='container-settings__progress-bar'> 
        <ProgressBar now={60} />
    </div>
  )
}

export default WorkoutProgress;