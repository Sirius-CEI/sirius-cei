const csvReducer = (state=[], action) => {
    switch (action.type) {
      case 'SET_CSV':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default csvReducer;
  