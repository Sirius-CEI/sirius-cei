export const FETCH_DATA_BEGIN = () => ({ type: 'FETCH_DATA_BEGIN' })

export const CLEAR_ERRORS = () => ({ type: 'CLEAR_ERRORS' })

export const FETCH_DATA_SUCCESS = () => ({ type: 'FETCH_DATA_SUCCESS' })

export const FETCH_DATA_FAILURE = () => ({ type: 'FETCH_DATA_FAILURE' })

export const MAIN = action => ({
	type: action.main,
	action
})

export const API_ERROR = (error) => ({
	type: 'API_ERROR',
	payload: error
})