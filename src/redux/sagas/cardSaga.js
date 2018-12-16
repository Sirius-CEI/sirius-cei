import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

function* getCards() {
    try {
      const response = yield axios.get('/cards');
      console.log('get cardSaga response', response.data);
      yield put({ type: 'SET_CARDS', payload: response.data });      
    } catch (error) {
      console.log('Card get request failed', error);
    }
}

function* addCard(action) {
    console.log('Add Card saga', action);
    try {
      yield call( axios.post, '/cards', action.payload );
      alert('Success adding Card!');
      yield put( { type: 'GET_CARDS' } );
    }
    catch(error) {
      console.log('error adding Card', error);
      alert('Error adding Card');
    }
  }
// ----------------------------------- //
// Mongo DELETE
// function* deleteCard(action) {
// console.log('Delete saga to remove Card: ', action.payload);
// try {
//     // axios asynch call to remove Card from server
//     yield call(axios.delete, '/cards', {params: {id: action.payload}});
//     alert('Deleted Card');
//     yield put( { type: 'GET_CARDS' } );
// }
//     catch (error) {
//         console.log('error with delete request to /cards');
//         alert('Error Deleting Card');
//     }
// }

//---------------------------------------//
// SQL DELETE
function* deleteCard(action) {
    console.log('Delete Card', action);
    try {
        yield call( axios.delete, `/cards/${action.payload}`);
        alert('Successfully Deleted Card');
        yield put( { type: 'GET_CARDS' } );
    }
    catch(error) {
        console.log('error with delete request', error);
            alert('Error Deleting Card');
    }
}
  
function* editCard(action) {
console.log('Edit Card saga', action.payload);
try {
    // axios asynch call to add koala to server
    yield call(axios.put, '/cards', action.payload);
    yield put( { type: 'GET_CARDS' } );
}
    catch (error) {
        console.log('error with transfer request to /api/koalas/transfer');
    }
}

function* cardSaga() {
  yield takeEvery('GET_CARDS', getCards);
  yield takeEvery('ADD_CARD', addCard);
  yield takeEvery('DELETE_CARD', deleteCard);
  yield takeEvery('EDIT_CARD', editCard);
}

export default cardSaga;