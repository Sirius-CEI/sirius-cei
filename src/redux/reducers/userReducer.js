const userReducer = (state = {_id: null, username: null}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {_id: null, username: null};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;
