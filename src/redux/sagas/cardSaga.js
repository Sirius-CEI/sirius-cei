import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* getCards() {
    console.log('in get card saga');
    try {
      const response = yield axios.get('/cards');
      console.log('get cardSaga response', response.data);
      yield put({ type: 'SET_CARDS', payload: response.data });      
    } catch (error) {
      console.log('Card get request failed', error);
    }
  }

function* cardSaga() {
  yield takeEvery('GET_CARDS', getCards);
}

export default cardSaga;