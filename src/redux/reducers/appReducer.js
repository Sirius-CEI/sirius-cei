const loading = (state = false, action) => {
	switch (action.type) {
		case 'FETCH_DATA_BEGIN':
			return true;
		case 'FETCH_DATA_SUCCESS':
			return false;
		case 'FETCH_DATA_FAILURE':
			return false;
		case 'FETCH_DATA_COMPLETE':
			return true;
		default:
			return state;
	}
}

export default loading;