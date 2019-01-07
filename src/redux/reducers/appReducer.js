const loading = (state = null, action) => {
	switch (action.type) {
		case 'FETCH_DATA_BEGIN':
			return true;
		case 'FETCH_DATA_SUCCESS':
			return false;
		case 'FETCH_DATA_FAILURE':
			return false;
		default:
			return state;
	}
}

export default loading;