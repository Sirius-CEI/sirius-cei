import { put, takeEvery } from 'redux-saga/effects';

function* getData(action) {
    try {
			yield put({ type: 'FETCH_DATA_BEGIN'});
			yield put({ type: 'CLEAR_ERRORS' });
			yield put({ type: action.main });
			yield put({ type: 'FETCH_DATA_SUCCESS' })
    } catch (error) {
			yield put({ type: 'API_ERROR', payload: error });
			yield put({ type: 'FETCH_DATA_FAILURE' });
    }
}

function* loadData(action) {
		yield put({ type: 'GET_OUTCOME_AREAS' });
		yield put({ type: 'GET_INDICATORS' });
		yield put({ type: 'GET_CHARTS' });
		yield put({ type: 'GET_CARDS' });
		yield put({ type: 'GET_DATA', main: 'FETCH_CARDS'})
}

function* getDataSaga() {
	yield takeEvery('GET_DATA', getData);
	yield takeEvery('LOAD_DATA', loadData);
}

export default getDataSaga;