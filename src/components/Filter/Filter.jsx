import React from "react";
import {ActionTypes} from "../../reducer";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const Filter = (props) => {
  const {setFilterValue} = props;
  let timeOut = null;

  return (
    <input
      onChange={(evt) => {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
          setFilterValue(evt.target.value);
        }, 500);
      }}
      className="contacts_search"
      type="text"
      placeholder="Поиск"
    />
  );
};

Filter.propTypes = {
  setFilterValue: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  setFilterValue(value) {
    dispatch({
      type: ActionTypes.SET_FILTER_VALUE,
      payload: value
    });
  }
});

export {Filter};
export default connect(null, mapDispatchToProps)(Filter);
