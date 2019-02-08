const outcomeAreaReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_OUTCOME_AREAS' || 'SET_OUTCOMES':
			return action.payload;
		default:
			return state;
	}
};

export const SET_OUTCOMES = 'SET_OUTCOMES';
export const setOutcomes = (payload) => {
  return { type: SET_OUTCOMES, payload }
}
  
// page will be on the redux state at:
// state.outcomes
export default outcomeAreaReducer;