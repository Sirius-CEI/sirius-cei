import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

function* getOutcomeAreas() {
    try {
      let response = yield call(axios.get, '/api/outcome-areas');
			if (response.data.error) { yield put({ type: 'API_ERROR', payload: response.data.error }) }
			yield put({ type: 'SET_OUTCOME_AREAS', payload: response.data });
    } catch (error) {
      console.log(`outcome areas get request failed`, error);
			yield put({ type: 'API_ERROR', payload: error })
    }
}

function* postOutcomeArea(action) {
	try {
		let response = yield call(axios.post, '/api/outcome-areas', { payload: action.payload });
		console.log(response);
		if (response.data.error) { yield put({ type: 'API_ERROR', payload: response.data.error }) }
		yield put({ type: 'GET_DATA', main: 'GET_OUTCOME_AREAS' });
	} catch (error) {
		console.log(`outcome area post request failed`, error);
		yield put({ type: 'API_ERROR', payload: error })
	}
}

function* updateOutcomeArea(action) {
	try {
		let response = yield call(axios.put, `/api/outcome-areas/${action.id}`, { payload: action.payload });
		if (response.data.error) { yield put({ type: 'API_ERROR', payload: response.data.error }) }
		yield put({ type: 'GET_DATA', main: 'GET_OUTCOME_AREAS' });
	} catch (error) {
		console.log(`outcome area put request failed`, error);
		yield put({ type: 'API_ERROR', payload: error })
	}
}

function* outcomeAreaSaga() {
	yield takeEvery('GET_OUTCOME_AREAS', getOutcomeAreas);
	yield takeEvery('POST_OUTCOME_AREA', postOutcomeArea);
	yield takeEvery('UPDATE_OUTCOME_AREA', updateOutcomeArea);
}

export default outcomeAreaSaga;