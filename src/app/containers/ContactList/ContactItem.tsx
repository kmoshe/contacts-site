import React, { Fragment } from 'react';
import { Contact } from '../../../types/Contact';
import './ContactItem.css';

interface Props {
  contact: Contact;
}

export function ContactItem({ contact }: Props) {
  return (
    <Fragment>
      <img
        src={contact.picture.medium}
        alt="Loading"
        className="contactImage"
      ></img>
      <span>
        {contact.name.title} {contact.name.last} {contact.name.first}
      </span>
    </Fragment>
  );
}
