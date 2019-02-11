import {
	API_GET
} from './types'

import { setData } from './api.actions'

export const apiGet = ({
  url = "",
	method = "GET",
	data = null,
  onSuccess = setData,
  onFailure = (method, url, error) => console.log(`Error with ${method} call to ${url}`, error),
	label = "",
}) => {
	return {
		type: API_GET,
		payload: {
			url,
			method,
			data,
			onSuccess,
			onFailure,
			label,
		}
	}
}