const pageReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_PAGES':
        return action.payload;
      default:
        return state;
    }
  };
  
  // page will be on the redux state at:
  // state.user
  export default pageReducer;