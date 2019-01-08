const outcomeAreaReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_OUTCOME_AREAS':
			return action.payload;
		default:
			return state;
	}
};
  
  // page will be on the redux state at:
  // state.outcomes
  export default outcomeAreaReducer;