import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Input } from '../ContactList/components/Input';
import { Link } from '../../components/Link';
import { ContactDetails as ContactDetailsComponent } from '../../components/ContactDetails';
import { TextButton } from '../ContactList/components/TextButton';
import { sliceKey, reducer, actions } from './slice';
import { contactDetailsSaga } from './saga';
import {
  selectContact,
  selectLoading, 
  selectLoaded, 
  selectError,
} from './selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { ContactErrorType } from './types';
import { useParams } from 'react-router-dom';

export function ContactDetails() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: contactDetailsSaga });

  const contact = useSelector(selectContact);
  const isLoading = useSelector(selectLoading); 
  const isLoaded = useSelector(selectLoaded);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  const params: { id: string } = useParams();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    dispatch(actions.loadContact(params.id));
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
        <Link to="/">Back</Link>
        <h3>Contact Details Page</h3>
        <InputWrapper>{isLoading && <LoadingIndicator small />}</InputWrapper>
      </FormGroup>
      {contact ? (
        <ContactDetailsComponent contact={contact} />
      ) : error ? (
        <ErrorText>{contactDetailsErrorText(error)}</ErrorText>
      ) : null}
    </Wrapper>
  );
}

export const contactDetailsErrorText = (error: ContactErrorType) => {
  switch (error) {
    case ContactErrorType.NOT_FOUND:
      return 'Contact Not Found';
    case ContactErrorType.RESPONSE_ERROR:
      return 'Contact Response Error';
    case ContactErrorType.RESPONSE_INCOMPLETE:
      return 'Unable To Load Contact';
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
  flex-direction: row;
  flex-wrap: wrap;
`;
