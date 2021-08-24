import React, {useEffect} from "react";
import Contact from "../Contact/Contact";
import {connect} from "react-redux";
import {operation} from "../../reducer";
import Preloader from "../Preloader/Preloader";
import PropTypes from "prop-types";

const filteredContacts = (filterValue, allContacts) => {
  if (!filterValue || filterValue.length === 0) {
    return allContacts;
  }

  const filter = filterValue.toLowerCase().replace(/[+ -]/g, '');

  return allContacts.filter(contact => {
    const name = contact.name.toLowerCase();
    const phone = contact.phone.replace(/[^\d]/g, '');
    return name.includes(filter) || phone.includes(filter);
  });
};

const ContactsList = (props) => {
  const {allContacts, editContact, deleteContact, isEditContact, addContact, loadContacts} = props;

  useEffect(() => {
    loadContacts();
  }, []);

  if (!allContacts) {
    return <Preloader/>;
  }

  if (isEditContact) {
    return <Preloader/>;
  }

  return (
    <table className="contacts_table">
      <tbody>
        <tr>
          <th>Имя</th>
          <th>Номер телефона</th>
          <th>
            <button
              className="contacts_button contacts_button--add"
              onClick={addContact}
            />
          </th>
        </tr>

        {allContacts.map(contact => {
          return <Contact
            key={contact.id}
            contact={contact}
            editContact={editContact}
            deleteContact={deleteContact}
          />;
        })}
      </tbody>
    </table>
  );
};

ContactsList.propTypes = {
  allContacts: PropTypes.array,
  editContact: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
  isEditContact: PropTypes.bool,
  addContact: PropTypes.func.isRequired,
  loadContacts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {

  if (!state.contacts) {
    return {
      allContacts: null
    };
  }

  const filterValue = state.filterValue;
  const allContacts = state.contacts;
  const contacts = filteredContacts(filterValue, allContacts);

  return {
    allContacts: contacts,
    isEditContact: state.isEditContact
  };
};

const mapDispatchToProps = (dispatch) => ({
  editContact(data) {
    dispatch(operation.editContact(data));
  },
  deleteContact(id) {
    dispatch(operation.deleteContact(id));
  },
  addContact() {
    dispatch(operation.addContact());
  },
  loadContacts() {
    dispatch(operation.loadContacts());
  }
});

export {ContactsList};
export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
