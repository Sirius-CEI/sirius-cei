import {
	SET_IMPACT_AREAS
} from "../actions/types";

const testReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_IMPACT_AREAS:
      return action.payload;
    default:
      return state;
	}
}

export default testReducer;