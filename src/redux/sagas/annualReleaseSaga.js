import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

function* getRelease() {
    try {
      const response = yield axios.get('/annual-release');
      console.log('get annual release response', response.data);
      yield put({ type: 'SET_RELEASE', payload: response.data });      
    } catch (error) {
      console.log('Release get request failed', error);
    }
}

function* addRelease(action) {
    console.log('Add Release saga', action);
    try {
      yield call( axios.post, '/annual-release', action.payload );
      alert('Success adding Release!');
      yield put( { type: 'GET_RELEASE' } );
    }
    catch(error) {
      console.log('Error adding Release', error);
      alert('Error adding Release');
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
// function* deleteRelease(action) {
//     console.log('Delete Release', action);
//     try {
//         yield call( axios.delete, `/annual-release/${action.payload}`);
//         alert('Successfully Deleted Release');
//         yield put( { type: 'GET_RELEASE' } );
//     }
//     catch(error) {
//         console.log('error with delete request', error);
//             alert('Error Deleting Release');
//     }
// }
  
// function* editRelease(action) {
// console.log('Edit Release saga', action.payload);
// try {
//     // axios asynch call to add koala to server
//     yield call(axios.put, '/annual-release', action.payload);
//     yield put( { type: 'GET_RELEASE' } );
// }
//     catch (error) {
//         console.log('Error with Release PUT request', error);
//     }
// }

function* releaseSaga() {
  yield takeEvery('GET_RELEASE', getRelease);
  yield takeEvery('ADD_RELEASE', addRelease);
//   yield takeEvery('DELETE_RELEASE', deleteRelease);
//   yield takeEvery('EDIT_RELEASE', editRelease);
}

export default releaseSaga;