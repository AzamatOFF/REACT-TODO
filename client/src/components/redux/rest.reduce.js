import { CREATE_REST, GET_ALL_RESTS, REMOVE_ONE_REST } from './type.redux';

const initialState = {
  rests: [],
  loaded: false,
  test: 'testing'
};

const RestReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_RESTS:

      return { ...state, rests: payload };
    case REMOVE_ONE_REST:

      return { ...state, rests: state.rests.filter((rest) => rest.id !== payload) };

    case CREATE_REST:

      return { ...state, rests: [payload, ...state.rests] };

    default:
      return state;
  }
};

export default RestReducer;
