const userReducer = (state = {_id: '', username: ''}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {_id: '', username: ''};
    default:
      return state;
  }
};

export const setUser = payload => ({
	type: 'SET_USER',
	payload
})

// user will be on the redux state at:
// state.user
export default userReducer;
