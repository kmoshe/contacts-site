import { ContactDetailsState } from '../app/containers/ContactDetails/types';
import { ContactListState } from '../app/containers/ContactList/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
  contactList?: ContactListState;
  contactDetails?: ContactDetailsState;
}
