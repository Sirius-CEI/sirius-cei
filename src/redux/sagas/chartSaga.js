import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* getCharts(action) {
    try {
			yield put({ type: 'FETCH_DATA_BEGIN'})
      let response = yield axios.get(`/api/charts/${action.indicator}`);
			// console.log('getOutcomeAreas response', response.data);
			yield put({ type: 'SET_CHARTS', payload: response.data });
			yield put({ type: 'FETCH_DATA_SUCCESS' })
    } catch (error) {
      console.log(`charts get request failed`, error);
			yield put({ type: 'API_ERROR', payload: error});
			yield put({ type: 'FETCH_DATA_FAILURE' });
    }
}

function* postChart(action) {
	try {
		yield put({ type: 'CLEAR_ERRORS' });
		let response = yield axios.post(`/api/charts`, { payload: action.payload });
		console.log(response);
		if (response.data.error) { yield put({ type: 'API_ERROR', payload: response.data.error }) }
		yield put({ type: 'GET_CHARTS', indicator: action.payload.indicator })
	} catch (error) {
		console.log(`chart post request failed`, error);
		yield put({ type: 'API_ERROR', payload: error });
	}
}

function* updateChart(action) {
	try {
		let response = yield axios.put(`/api/charts/${action.id}`, { payload: action.payload })
		console.log(response.data);
		if (response.data.error) { yield put({ type: 'API_ERROR', payload: response.data.error }) }
		yield put({ type: 'GET_CHARTS', indicator: action.payload.indicator });
	} catch (error) {
		console.log(`chart put request failed`, error);
		yield put({ type: 'API_ERROR', payload: error});
	}
}

function* chartSaga() {
	yield takeEvery('GET_CHARTS', getCharts);
	yield takeEvery('POST_CHART', postChart);
	yield takeEvery('UPDATE_CHART', updateChart);
}

export default chartSaga;