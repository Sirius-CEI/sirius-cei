import { put, call, all, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { apiError, apiStart, apiEnd, clearErrors, setData } from "../actions/api";


function* apiRequest({ label, config }) {
	const { method } = config;
	try {
		yield put(apiStart(label, method));
		yield put(clearErrors(label, method));
		const response = yield call(axios.request, config)
		// console.log(response);
		const { data } = response;
		if (data.error) {
			yield put(apiError(data.error, label))
		}
	} catch (error) {
		yield put(apiError(error, label, method))
	} finally {
		yield put(apiEnd(label, method))
		return;
	}
}

// resuable fetch Subroutine
function* fetchData({ label, baseUrl, config = { withCredentials: true } }) {
	try {
		yield put(apiStart(label));
		yield put(clearErrors(label));
		const response = yield call(axios.get, baseUrl, config)
		// console.log(response);
		const { data } = response;
		if (data.error) {
			yield put(apiError(data.error, label));
		}
		yield put(setData(`SET_${label}`.toUpperCase().replace(/\s/g, '_'), data));
	} catch (error) {
		yield put(apiError(error, label))
	} finally {
		yield put(apiEnd(label))
		return;
	}
}

function* sequenceCalls(action) {
	const { label, baseUrl } = action;
	yield call(apiRequest, action);
	yield call(fetchData, { label, baseUrl })
	return;
}

function* fetchPublic(action) {
    try {
			yield all([
				yield call(fetchData, { baseUrl: '/api/outcome-areas', label: 'OUTCOME_AREAS' }),
				yield call(fetchData, { baseUrl: '/api/indicators', label: 'ALL_INDICATORS' }),
				yield call(fetchData, { baseUrl: '/api/charts', label: 'CHARTS' }),
				yield call(fetchData, { baseUrl: '/api/csv', label: 'CHART_DATA' }),
				yield call(fetchData, { baseUrl: '/api/cards', label: 'CARDS' }),
			])
    } catch (error) {
			yield put(apiError(error, `Public Load`));
		} finally {
			yield put(apiEnd(`Public Load`))
			return 'fetchPublic complete';
		}
}

function* fetchAdmin(action) {
	try {
		yield all([
			yield call(fetchData, { baseUrl: '/api/users', label: 'USERS' }),
		])
	} catch (error) {
		yield put(apiError(error, `Admin Load`));
	} finally {
		yield put(apiEnd(`Admin Load`))
		return;
	}
}

function* fetchAll(action) {
	try {
		const response = yield call(fetchPublic)
		console.log(response);
		yield put({type: 'ADMIN_LOAD'})
	} catch (e) {
		yield put(apiError(e, 'Initial Load'))
	} finally {
		yield put(apiEnd('Initial Load'))
		return 'fetchAll complete';
	}
}

function* dataSaga() {
	yield takeEvery('INITIAL_LOAD', fetchAll);
	yield takeEvery('ADMIN_LOAD', fetchAdmin);
	yield takeEvery('API_GET', fetchData);
	yield takeEvery('API', sequenceCalls)
}

export default dataSaga;