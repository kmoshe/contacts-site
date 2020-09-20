import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Input } from '../ContactList/components/Input';
import { ContactItem } from '../ContactList/ContactItem';
import { TextButton } from '../ContactList/components/TextButton';
import { sliceKey, reducer, actions } from '../ContactList/slice';
import { contactListSage } from '../ContactList/saga';
import {
  selectContacts,
  selectLoading,
  selectLoaded,
  selectError,
} from '../ContactList/selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { ContactErrorType } from '../ContactList/types';
import { Link } from '../../components/Link';
import './ContactList.css';

export function ContactList() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: contactListSage });

  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectLoading);
  const isLoaded = useSelector(selectLoaded);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {

    if (contacts.length === 0) {
      dispatch(actions.loadContacts(20));
    }
  });

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    /* istanbul ignore next  */
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }
  };

  return (
    <Fragment>
      <h1>Contacts Page</h1>
      {isLoading && <LoadingIndicator small />}
      {contacts?.length > 0 ? (
        <ul>
          {contacts.map(contact => (
            <li
              className="col-md-6 col-lg-4 col-sm-12"
              key={contact.login.uuid}
            >
              <Link to={`/contact/${contact.login.uuid}`}>
                <ContactItem key={contact.login.uuid} contact={contact} />
              </Link>
            </li>
          ))}
        </ul>
      ) : error ? (
        <ErrorText>{contactListErrorText(error)}</ErrorText>
      ) : null}
    </Fragment>
  );
}

export const contactListErrorText = (error: ContactErrorType) => {
  switch (error) {
    case ContactErrorType.NOT_FOUND:
      return 'Contacts Not Found';
    case ContactErrorType.RESPONSE_ERROR:
      return 'Contacts Response Error';
    case ContactErrorType.RESPONSE_INCOMPLETE:
      return 'Unable To Load More Contacts';
    default:
      return 'An error has occurred!';
  }
};

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;