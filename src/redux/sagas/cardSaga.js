import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

function* getCards() {
    try {
			yield put({ type: 'FETCH_DATA_BEGIN' })
      const response = yield axios.get('/api/cards');
			yield put({ type: 'SET_CARDS', payload: response.data });
			yield put({ type: 'FETCH_DATA_SUCCESS' })
    } catch (error) {
			yield put({ type: 'FETCH_DATA_FAILURE' })
    }
}

function* addCard(action) {
    try {
      yield call( axios.post, '/api/cards', action.payload );
      alert('Success adding Card!');
      yield put( { type: 'GET_CARDS' } );
    }
    catch(error) {
      alert(`Error adding card: ${error.message}`);
    }
  }
// ----------------------------------- //
// Mongo DELETE
function* deleteCard(action) {
  try {
    // axios asynch call to remove Card from server
    yield call(axios.delete, `/api/cards/${action.payload}`);
    // alert('Deleted Card');
    yield put( { type: 'GET_CARDS' } );
  }
    catch (error) {
        alert(`Error deleting card: ${error.message}`);
    }
}
  
function* editCard(action) {
const cardId = action.payload._id
try {
    // axios asynch call to add card to server
    yield call(axios.put, `/api/cards/${cardId}`, action.payload);
    yield put( { type: 'GET_CARDS' } );
}
    catch (error) {
				alert(`Error updating card: ${error.message}`)
    }
}

function* cardSaga() {
  yield takeEvery('GET_CARDS', getCards);
  yield takeEvery('ADD_CARD', addCard);
  yield takeEvery('DELETE_CARD', deleteCard);
  yield takeEvery('EDIT_CARD', editCard);
}

export default cardSaga;