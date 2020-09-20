import { call, put, select, takeLatest } from 'redux-saga/effects';
import ApiService from '../../../services/apiService';
import { selectContacts, selectMaxCount } from './selectors';
import { actions } from './slice';
import { ApiResponse, Contact } from '../../../types/Contact';
import { ContactErrorType } from './types';

export function* getContacts(action) {
  const service = new ApiService();
  let currentList: Contact[] = yield select(selectContacts);
  let count = currentList.length;
  let max: number = yield select(selectMaxCount);

  const requestURL = `https://randomuser.me/api/?results=10`;

  while (count < max) {
    try {
      const response: ApiResponse = yield call(service.getContacts);
      if (response.results?.length > 0) {
        yield put(actions.contactsLoaded(response.results));
      } else {
        yield put(
          actions.contactsLoadingFailure(ContactErrorType.RESPONSE_ERROR),
        );
      }
    } catch (err) {
      if (err.response?.status === 404) {
        yield put(actions.contactsLoadingFailure(ContactErrorType.NOT_FOUND));
      } else {
        yield put(
          actions.contactsLoadingFailure(ContactErrorType.RESPONSE_ERROR),
        );
      }
      break;
    }
    currentList = yield select(selectContacts);
    count = currentList.length;
  }
}

export function* contactListSage() {
  yield takeLatest(actions.loadContacts.type, getContacts);
  yield takeLatest(actions.loadNextContactsBatch.type, getContacts);
}
