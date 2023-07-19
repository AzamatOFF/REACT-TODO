import { domainAddress } from '../../constants/api';
import { CREATE_REST, GET_ALL_RESTS, REMOVE_ONE_REST } from './type.redux';

export const getAllRestsAction = () => (disp) => (
  fetch(`${domainAddress}/rests`)
    .then((res) => res.json())
    .then((data) => {
      disp({ type: GET_ALL_RESTS, payload: data });
    })
    .catch(console.error)
);

export const removeOneAction = (restId) => (dispatch) => (
  fetch(`${domainAddress}/${restId}`, {
    method: 'DELETE',
    credentials: 'include'
  })
    .then((res) => {
      if (res.ok) {
        dispatch({ type: REMOVE_ONE_REST, payload: restId });
      }
    }).catch(console.error)
);

export const createOneAction = (input, navigate) => (dispatch) => (
  fetch(`${domainAddress}/todo`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ input, status: false })
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: CREATE_REST, payload: data });
      navigate('/');
    })
    .catch(console.error)
);
