import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

function* getCharts(action) {
    try {
      let response = yield call(axios.get, `/api/charts`);
			if (response.data.error) { yield put({ type: 'API_ERROR', payload: response.data.error }) }
			yield put({ type: 'SET_CHARTS', payload: response.data });
    } catch (error) {
			yield put({ type: 'API_ERROR', payload: error });
    }
}

function* postChart(action) {
	try {
		yield put({ type: 'CLEAR_ERRORS' });
		let response = yield call(axios.post, `/api/charts`, { payload: action.payload });
		if (response.data.error) { yield put({ type: 'API_ERROR', payload: response.data.error }) }
		yield put({ type: 'GET_DATA', main: 'GET_CHARTS' })
	} catch (error) {
		yield put({ type: 'API_ERROR', payload: error });
	}
}

function* updateChart(action) {
	try {
		yield put({ type: 'CLEAR_ERRORS' });
		let response = yield call(axios.put, `/api/charts/${action.id}`, { payload: action.payload });
		if (response.data.error) { yield put({ type: 'API_ERROR', payload: response.data.error }) }
		yield put({ type: 'GET_DATA', main: 'GET_CHARTS' })
	} catch (error) {
		yield put({ type: 'API_ERROR', payload: error});
	}
}

function* chartSaga() {
	yield takeEvery('GET_CHARTS', getCharts);
	yield takeEvery('POST_CHART', postChart);
	yield takeEvery('UPDATE_CHART', updateChart);
}

export default chartSaga;