const selectedIndicatorReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_INDICATOR':
      return action.payload;
    default:
      return state;
  }
};

export default selectedIndicatorReducer;
