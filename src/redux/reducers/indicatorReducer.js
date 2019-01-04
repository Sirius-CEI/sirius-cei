const initialState = {
	title: '',
	copy: '',
	active: false,
	order: 100,
	notes: '',
	charts: []
}

const indicatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_INDICATOR':
      return action.payload;
    default:
      return state;
  }
};

export default indicatorReducer;
