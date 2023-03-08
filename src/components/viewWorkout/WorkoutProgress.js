import './WorkoutProgress.scss'


const WorkoutProgress = (props) => {
  const {completed} = props;

  const fillerStyles = {
    width: `${completed}%`,
  }
  
  return (
    <div className="progBarContainer">
      <div className="filler" style={fillerStyles}>
       <p> {`${completed}%`} </p>
      </div>
    </div>
  );
};

export default WorkoutProgress;