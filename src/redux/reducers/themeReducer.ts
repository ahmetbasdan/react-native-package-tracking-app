import * as actionTypes from "../actions/actionTypes";

const initialState = "light";

const themeReducer = (state = initialState, action: action) => {
  switch (action.type) {
    case actionTypes.SET_DARK_THEME:
      return "dark";
    case actionTypes.SET_LIGHT_THEME:
      return "light";
    default:
      return state;
  }
};

export default themeReducer;
