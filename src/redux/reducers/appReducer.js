import {
  API_START,
	API_END,
} from "../actions/types";

const loading = (state = false, action) => {
	switch (action.type) {
		case 'FETCH_DATA_BEGIN':
			return true;
		case 'FETCH_DATA_SUCCESS':
			return false;
		case 'FETCH_DATA_FAILURE':
			return false;
		case API_START:
			return true;
		case API_END:
			return false;
		default:
			return state;
	}
}

export default loading;