import React from 'react';
import styled from 'styled-components/macro';
import { Contact } from '../../../types/Contact';

interface Props {
  contact: Contact;
}

export function ContactItem({ contact }: Props) {
  return (
    <Wrapper>
      <Image>
        <img src={contact.picture.thumbnail} alt="Loading"></img>
      </Image>
      <Name>
        {contact.name.title} {contact.name.last} {contact.name.first}
      </Name>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex: 1 100%;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0 1rem;
  min-height: 2.75rem;
  font-weight: 500;
  color: ${p => p.theme.text};

  &:nth-child(odd) {
    background-color: ${p => p.theme.backgroundVariant};
  }
`;

const Image = styled.div`
  padding: 0.625rem 0;
`;

const Name = styled.div`
  flex: 1;
  padding: 0.625rem 0;
`;

const Info = styled.div`
  display: flex;
`;

const StarCount = styled.div`
  display: flex;
  align-items: center;
  min-width: 6rem;
  .icon {
    margin-right: 0.125rem;
  }
`;
