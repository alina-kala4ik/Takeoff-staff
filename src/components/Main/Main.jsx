import React from "react";
import ContactsList from "../ContactsList/ContactsList";
import Filter from "../Filter/Filter";

const Main = () => {

  return (
    <div className="page contacts">
      <p className="contacts_title">Список контактов</p>

      <Filter/>

      <ContactsList/>

    </div>
  );
};

export default Main;
