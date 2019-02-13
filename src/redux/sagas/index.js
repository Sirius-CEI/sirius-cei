import { all } from 'redux-saga/effects';
import registrationSaga from './registrationSaga';
import passwordSaga from './passwordSaga';
import outcomeAreaSaga from './outcomeAreaSaga';
import chartSaga from './chartSaga';
import indicatorSaga from './indicatorSaga';
import csvSaga from './csvSaga';
import dataSaga from './apiSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    registrationSaga(),
    passwordSaga(),
		outcomeAreaSaga(),
		indicatorSaga(),
		chartSaga(),
		csvSaga(),
		dataSaga(),
  ]);
}
