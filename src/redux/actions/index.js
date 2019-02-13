export const apiAction = ({
  baseUrl = "",
  method = "GET",
	data = null,
	id = "",
	params = {},
  label = "",
	headers = { 'Content-Type': 'application/json' },
	withCredentials = true,
}) => {
  return {
		type: 'API',
		label,
		baseUrl,
    config: {
      url: `${baseUrl}/${id}`,
      method,
      data,
			headers,
			withCredentials,
			params
    }
  };
}

export const apiGet = ({
  baseUrl = "",
	label = "",
	headers = { 'Content-Type': 'application/json' },
	withCredentials = true,
	params = {}
}) => {
	console.log(`in apiGet`);
	return {
		type: 'API_GET',
		label,
		baseUrl,
		config: {
			headers,
			withCredentials,
			params,
		}
	}
}

export const getInitialData = () => ({ type: 'INITIAL_LOAD' })