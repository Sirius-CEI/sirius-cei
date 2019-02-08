import { put, all, call, takeEvery } from 'redux-saga/effects';

function* getData(action) {
    try {
			yield* all([
				yield put({ type: 'FETCH_DATA_BEGIN' }),
				yield put({ type: 'CLEAR_ERRORS' })
			])
			yield put({ type: action.main, action: action });
    } catch (error) {
			yield* put({ type: 'API_ERROR', payload: error });
			yield put({ type: 'FETCH_DATA_FAILURE' });
    }
}

function* setData(action) {

}

function* loadData(action) {
	try {
		yield* all([
			yield put({ type: 'FETCH_USER' }),
			yield put({ type: 'GET_OUTCOME_AREAS' }),
			yield put({ type: 'GET_INDICATORS' }),
			yield put({ type: 'GET_CHARTS' }),
			yield put({ type: 'GET_CARDS' }),
			yield put({ type: 'FETCH_CSV' }),
			yield put({ type: 'FETCH_CSV_DATA' })
		])
		yield put({ type: 'FETCH_DATA_SUCCESS' })
	} catch (e) {
		yield* put({ type: 'API_ERROR', payload: e });
		yield put({ type: 'FETCH_DATA_FAILURE' });
	}
		
}

function* getDataSaga() {
	yield takeEvery('GET_DATA', getData);
	yield takeEvery('SET_DATA', setData)
	yield takeEvery('LOAD_DATA', loadData);
}

export default getDataSaga;