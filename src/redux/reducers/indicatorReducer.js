const indicatorReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_INDICATORS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // page will be on the redux state at:
  // state.indicators
  export default indicatorReducer;