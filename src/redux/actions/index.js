import {
	INITIAL_LOAD
} from "./types";

import { apiGet } from './api.methods';

export const fetchDataFn = (url, label) => {
	return apiGet({
		url,
		label
	})
}

export const getInitialData = () => ({ type: INITIAL_LOAD })