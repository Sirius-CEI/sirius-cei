import axios from 'axios';
import { call, takeEvery } from 'redux-saga/effects';
  
// function* editPassword(action) {
// console.log('Edit password saga', action.payload);
// try {
//     yield call(axios.put, '/password', action.payload);
//     alert('Successfully Changed Password')
// }
//     catch (error) {
//         console.log('error with Password PUT request', error);
//         alert('Error Changing Password')
//     }
// }

function* forgotPassword(action) {
    console.log('forgot password', action.payload);
    const username = action.payload;
    try{
        const response = yield call(axios.post, `/password-reset`, username );
        console.log(response.data);
        
    }
    catch (error) {
        console.log('error with forgot password request', error);
    }
}

function* getToken() {
    console.log('in get token');
    
}

function* passwordSaga() {
//   yield takeEvery('EDIT_PASSWORD', editPassword);
  yield takeEvery('FORGOT_PASSWORD', forgotPassword);
  yield takeEvery('GET_TOKEN', getToken);
}

export default passwordSaga;