const cardReducer = (state=[], action) => {
    console.log('card reducer state: ', state);
    switch (action.type) {
      case 'SET_CARDS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // cards will be on the redux state at:
  // props.cards
  export default cardReducer;
  