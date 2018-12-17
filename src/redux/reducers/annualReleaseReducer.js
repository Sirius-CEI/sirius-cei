const releaseReducer = (state=[], action) => {
    console.log('Release reducer state: ', state);
    switch (action.type) {
      case 'SET_RELEASE':
        return action.payload;
      default:
        return state;
    }
  };
  
  // Annual Releases will be on the redux state at:
  // props.annualRelease
  export default releaseReducer;
  