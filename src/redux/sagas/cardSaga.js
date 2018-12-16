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

function* addCard(action) {
    console.log('POST saga to add Card: ', action.payload);
    try {
        // asynch call to add card to server
        yield call(axios.post, '/cards', action.payload);
        yield put( { type: 'SET_CARDS' } );
    }
    catch (error) {
        console.log('error with POST request to /cards', error);
    }
  }
  
  function* deleteCard(action) {
    console.log('in delete saga to remove card: ', action.payload);
    try {
        // axios asynch call to add koala to server
        yield call(axios.delete, '/api/koalas', {params: {id: action.payload}});
        yield put( { type: 'GET_KOALAS' } );
    }
    catch (error) {
        console.log('error with delete request to /api/koalas');
    }
  }
  
  function* transferKoala(action) {
    console.log('in saga for set ready to transfer for a koala', action.payload);
    try {
        // axios asynch call to add koala to server
        yield call(axios.put, '/api/koalas/transfer', action.payload);
        yield put( { type: 'GET_KOALAS' } );
    }
    catch (error) {
        console.log('error with transfer request to /api/koalas/transfer');
    }
  }

function* cardSaga() {
  yield takeEvery('GET_CARDS', getCards);
  yield takeEvery('ADD_CARD', addCard)
}

export default cardSaga;