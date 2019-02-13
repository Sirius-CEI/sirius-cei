import {
	API_START,
	API_END,
	ACCESS_DENIED,
	API_ERROR,
	CLEAR_ERRORS,
} from "./types";

export const setData = (type, payload) => ({
	type,
	payload
})

export const apiStart = (label, method='GET') => ({
  type: API_START,
	label,
	method
});

export const apiEnd = (label, method='GET') => ({
  type: API_END,
	label,
	method
});

export const accessDenied = url => ({
  type: ACCESS_DENIED,
  url
});

export const clearErrors = (label, method = 'GET') => ({
	type: CLEAR_ERRORS,
	label,
	method
})

export const apiError = (error, label, method = 'GET') => ({
	type: API_ERROR,
	label,
	method,
	payload: error,
});