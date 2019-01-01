import axios from 'axios';
import { call, takeEvery } from 'redux-saga/effects';
  
function* sendEmail(action) {
console.log('Send Password Email Saga');
try {
    yield call(axios.post, '/email');
}
    catch (error) {
        console.log('error with Email POST request', error);
    }
}

function* passwordEmailSaga() {
  yield takeEvery('SEND_EMAIL', sendEmail);
}

export default passwordEmailSaga;