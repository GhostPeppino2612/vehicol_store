import {AuthState} from "../../types/types";
import {AuthActionTypes, LOGIN, LOGOUT} from "../actions/actions"

const initialState: AuthState = {
  user: null,
  isAuthenticated: false
};

export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};