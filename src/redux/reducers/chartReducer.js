const chartReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_CHARTS':
			return action.payload;
		default:
			return state;
	}
};
  
  // page will be on the redux state at:
  // state.charts
  export default chartReducer;