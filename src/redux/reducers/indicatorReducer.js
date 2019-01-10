const indicatorReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_INDICATORS':
      return action.payload;
    default:
      return state;
  }
};

export default indicatorReducer;
