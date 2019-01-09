import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* postIndicator(action) {
	try {
		let response = yield axios.post(`/api/indicators/${action.id}`, { payload: action.payload })
		// console.log(response.data);
		if (response.data.error) { yield put({ type: 'API_ERROR', payload: response.data.error }) }
		yield put({ type: 'GET_OUTCOME_AREAS' });
	} catch (error) {
		console.log(`indicator post request failed`, error);
		yield put({ type: 'API_ERROR', payload: error });
	}
}

function* updateIndicator(action) {
	try {
		let response = yield axios.put(`/api/indicators/${action.outcomeId}/${action.id}`,
			{ payload: action.payload })
		console.log('indicator put response', response.data);
		if (response.data.error) { yield put({ type: 'API_ERROR', payload: response.data.error }) }
		yield put({ type: 'GET_OUTCOME_AREAS' });
	} catch (error) {
		console.log(`indicator post request failed`, error);
		yield put({ type: 'API_ERROR', payload: error });
	}
}

function* indicatorSaga() {
	yield takeEvery('POST_INDICATOR', postIndicator);
	yield takeEvery('UPDATE_INDICATOR', updateIndicator);
}

export default indicatorSaga;