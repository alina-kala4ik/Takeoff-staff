import history from "./history";

const initialState = {
  contacts: null,
  filterValue: null,
  isEditContact: false,
};

const ActionTypes = {
  LOAD_CONTACTS: 'LOAD_CONTACTS',
  SET_FILTER_VALUE: 'SET_FILTER_VALUE',
  EDIT_CONTACT: 'EDIT_CONTACT',
};

const getCookie = (name) => {
  let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const operation = {
  authentication: (data) => (dispatch, getState, api) => {
    return api.post('/login', data)
      .then(response => {
        const {data} = response;
        const {accessToken} = data;
        document.cookie = `token=${accessToken}`
      })
      .then(() => history.push('/'))
  },
  loadContacts: () => (dispatch, getState, api) => {
    const token = getCookie('token');

    return api.get('/contacts', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        const {data} = response;
        dispatch({
          type: ActionTypes.LOAD_CONTACTS,
          payload: data
        });
      })
  },
  editContact: (data) => (dispatch, getState, api) => {
    dispatch({
      type: ActionTypes.EDIT_CONTACT,
      payload: true
    });

    const token = getCookie('token');

    return api.put(`/contacts/${data.id}`, {
      name: data.name,
      phone: data.phone,
      isEditing: false
    }, {headers: { Authorization: `Bearer ${token}` }})
      .then(() => dispatch(operation.loadContacts()))
      .then(() => {
        dispatch({
          type: ActionTypes.EDIT_CONTACT,
          payload: false
        })
      })
  },
  deleteContact: (id) => (dispatch, getState, api) => {
    const token = getCookie('token');

    dispatch({
      type: ActionTypes.EDIT_CONTACT,
      payload: true
    });

    return api.delete(`/contacts/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => dispatch(operation.loadContacts()))
      .then(() => {
        dispatch({
          type: ActionTypes.EDIT_CONTACT,
          payload: false
        })
      })
  },
  addContact: () => (dispatch, getState, api) => {
    const token = getCookie('token');

    api.post('contacts/', {
      name: '',
      phone: '',
      isEditing: true
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => dispatch(operation.loadContacts()))
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_CONTACTS:
      return Object.assign({}, state, {contacts: action.payload});
    case ActionTypes.SET_FILTER_VALUE:
      return Object.assign({}, state, {filterValue: action.payload});
    case ActionTypes.EDIT_CONTACT:
      return Object.assign({}, state, {isEditContact: action.payload});
    default:
      return state;
  }
};

export {reducer, operation, ActionTypes};
