const csvReducer = (state=[], action) => {
    switch (action.type) {
      case 'SET_CSV':
        return action.payload;
      default:
        return state;
    }
  };
  
  // cards will be on the redux state at:
  // props.csv
  export default csvReducer;
  