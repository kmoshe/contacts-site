import { put, select, takeLatest, delay } from 'redux-saga/effects';
import { selectContacts } from '../ContactList/selectors';
import { actions } from './slice';
import { Contact } from '../../../types/Contact';
import { ContactErrorType } from './types';

export function* getContact(action) {
  debugger;
  let contacts: Contact[] = yield select(selectContacts);
  let contact = contacts.find(current => current.login.uuid === action.payload);
  if (contact) {
    yield put(actions.contactLoaded(contact));
  }
  else {
    yield put(actions.contactsLoadingFailure(ContactErrorType.NOT_FOUND));
  }
}

export function* contactDetailsSaga() {
  yield takeLatest(actions.loadContact.type, getContact);
}
