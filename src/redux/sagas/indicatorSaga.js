import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

function* getIndicators() {
	try {
		let response = yield call(axios.get, '/api/indicators');
		// console.log(response.data);
		yield put({ type: 'SET_ALL_INDICATORS', payload: response.data });
	} catch (error) {
		console.log(`indicators get request failed`, error);
	}
}

function* postIndicator(action) {
	try {
		let response = yield call(axios.post, `/api/indicators`, { payload: action.payload });
		console.log(response.data);
		if (response.data.error) { yield put({ type: 'API_ERROR', payload: response.data.error }) }
		yield put({ type: 'GET_DATA', main: 'GET_INDICATORS' });
	} catch (error) {
		console.log(`indicator post request failed`, error);
		yield put({ type: 'API_ERROR', payload: error });
	}
}

function* updateIndicator(action) {
	try {
		let response = yield axios.put(`/api/indicators/${action.id}`,
			{ payload: action.payload }
		)
		console.log('indicator put response', response.data);
		if (response.data.error) { yield put({ type: 'API_ERROR', payload: response.data.error }) }
		yield put({ type: 'GET_DATA', main: 'GET_INDICATORS' });
	} catch (error) {
		console.log(`indicator post request failed`, error);
		yield put({ type: 'API_ERROR', payload: error });
	}
}

function* indicatorSaga() {
	yield takeEvery('GET_INDICATORS', getIndicators);
	yield takeEvery('POST_INDICATOR', postIndicator);
	yield takeEvery('UPDATE_INDICATOR', updateIndicator);
}

export default indicatorSaga;