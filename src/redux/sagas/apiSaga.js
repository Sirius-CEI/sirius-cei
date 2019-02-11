import { put, call, all, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { apiError, apiStart, apiEnd, clearErrors } from "../actions/api.actions";
import {
	fetchDataFn,
} from '../actions';

function* initialLoad(action) {
    try {
			yield all([
				yield put(fetchDataFn('/api/outcome-areas', 'Outcome Areas')),
				yield put(fetchDataFn('/api/indicators', 'All Indicators')),
				yield put(fetchDataFn('/api/charts', 'Charts')),
				yield put(fetchDataFn('/api/csv', 'Chart Data')),
				yield put(fetchDataFn('/api/cards', 'Cards'))
			])
    } catch (error) {
			yield put(apiError(error, `Initial Load`));
		} finally {
			yield put(apiEnd(`Initial Load`))
		}
}

// resuable fetch Subroutine
function* fetchData(action) {
	const { label, url, method, onSuccess, onFailure, setDataAction } = action.payload;
	console.log(`in fetchData`, typeof setDataAction);
	try {
		yield put(apiStart(label))
		yield put(clearErrors(label));
		const response = yield call(axios.get, url)
		if (response.error) {
			yield put(onFailure(method, url, response.error))
			yield put(apiError(response.error, `${label} ${method}`))	
		} else {
			yield put(onSuccess(response.data, `Set ${label}`.toUpperCase().replace(/\s/g, '_')))
		}
	} catch (error) {
		yield put(onFailure(method, url, error))
		yield put(apiError(error, `${label} ${method}`))
	} finally {
		yield put(apiEnd(label))
	}
}

function* dataSaga() {
	yield takeEvery('INITIAL_LOAD', initialLoad);
	yield takeEvery('API_GET', fetchData);
}

export default dataSaga;