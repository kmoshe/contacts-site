import React from 'react';
import styled from 'styled-components/macro';
import { Contact } from '../../../types/Contact';

interface Props {
  contact: Contact
}

export function ContactDetails({ contact }: Props) {
  return (
    <Wrapper>
        <img src={contact.picture.large} />
      <Name>
        {contact.name.title} {contact.name.last} {contact.name.first}
      </Name>
      <p>{contact.email}</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 0 50%;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  padding: 0 1rem;
  min-height: 2.75rem;
  font-weight: 500;
  color: ${p => p.theme.text};

  &:nth-child(odd) {
    background-color: ${p => p.theme.backgroundVariant};
  }
`;

const Name = styled.div`
  flex: 1;
  padding: 0.625rem 0;
`;
