import React, { useEffect } from 'react';
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
    <Wrapper>
      <FormGroup onSubmit={onSubmitForm}>
        <h3>Contacts Page</h3>
        <InputWrapper>{isLoading && <LoadingIndicator small />}</InputWrapper>
      </FormGroup>
      {contacts?.length > 0 ? (
        <List>
          {contacts.map(contact => (
            <Link to={`/contact/${contact.login.uuid}`} key={contact.login.uuid}>
              <ContactItem key={contact.login.uuid} contact={contact} />
            </Link>
          ))}
        </List>
      ) : error ? (
        <ErrorText>{contactListErrorText(error)}</ErrorText>
      ) : null}
    </Wrapper>
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

const Wrapper = styled.div`
  display:flex ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  ${Input} {
    width: ${100 / 3}%;
    margin-right: 0.5rem;
  }
`;

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;
