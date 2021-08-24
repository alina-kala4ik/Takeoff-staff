import React, {useState} from "react";
import PropTypes from "prop-types";

const Contact = (props) => {
  const {contact, editContact, deleteContact} = props;
  const {id} = contact;

  const [idEditing, setIsEditing] = useState(contact.isEditing);
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);

  return (
    <tr className={idEditing ? 'editing' : ''}>
      <td>
        <input
          type="text"
          value={name}
          readOnly={!idEditing}
          onChange={(evt) => {
            setName(evt.target.value);
          }}
        />
      </td>
      <td>
        <input
          type="text"
          value={phone}
          readOnly={!idEditing}
          onChange={(evt) => {
            setPhone(evt.target.value);
          }}
        />
      </td>
      <td className="contacts_editing-column">
        <button
          className={`contacts_button contacts_button--edit ${idEditing ? `hidden` : ``}`}
          onClick={() => setIsEditing(true)}
        />
        <button
          className={`contacts_button contacts_button--save ${idEditing ? `` : `hidden`}`}
          onClick={() => {
            const data = {
              id, name, phone, isEditing: false
            };
            editContact(data);
            setIsEditing(false);
          }}
        />
        <button
          className="contacts_button contacts_button--delete"
          onClick={() => {
            deleteContact(id);
          }}
        />
      </td>
    </tr>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired
  }).isRequired,
  editContact: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired
};

export default Contact;
