import {
	API_START,
	API_END,
	ACCESS_DENIED,
	API_ERROR,
	CLEAR_ERRORS,
	API_GET,
} from "./types";

export const getData = payload => ({ 
	type: API_GET,
	...payload
})

export const apiStart = label => ({
  type: API_START,
  label
});

export const apiEnd = label => ({
  type: API_END,
  label
});

export const accessDenied = url => ({
  type: ACCESS_DENIED,
  url
});

export const clearErrors = label => ({
	type: CLEAR_ERRORS,
	label
})

export const apiError = (error, label) => ({
	type: API_ERROR,
	label,
	payload: error,
});

export const setData = (payload, type) => ({
	type,
	payload
})