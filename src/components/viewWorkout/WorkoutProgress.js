


const WorkoutProgress = (props) => {
  const {completed} = props;
  
  
  const containerStyles = {
    height: 30,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: "#FFE600",
    borderRadius: 'inherit',
    textAlign: 'right',
    color: 'black',
    fontWeight: 'bold',
    lineHeight: 2,
    verticalAlign: 'middle',
    paddingRight: 10
  }
  
  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
       <p> {`${completed}%`} </p>
      </div>
    </div>
  );
};






export default WorkoutProgress;