import React, {useRef} from "react";
import {operation} from "../../reducer";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const Authorization = (props) => {
  const {handlerAuthentication} = props;

  const formRef = useRef(null);

  return (
    <div className="page authorization">
      <form ref={formRef}>
        <p>Личный кабинет</p>
        <input name="email" type="text" required placeholder="email"/>
        <input name="password" type="password" required placeholder="пароль"/>
        <button
          type="button"
          onClick={(evt) => {
            evt.preventDefault();
            const data = new FormData(formRef.current);
            handlerAuthentication({
              email: data.get('email'),
              password: data.get('password')
            });
          }}
        >
          Вход
        </button>
      </form>
    </div>
  );
};

Authorization.propTypes = {
  handlerAuthentication: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  handlerAuthentication(data) {
    dispatch(operation.authentication(data));
  }
});

export default connect(null, mapDispatchToProps)(Authorization);
