const userData = localStorage.getItem("userData")
const { isLogged, token, id } = JSON.parse(userData)
const loggedReducer = (
  state = { isLogin: isLogged, token, id: id, user: {} },
  action
) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isLogin: action.payload.isLogin,
        token: action.payload.token,
        id: action.payload.id
      };
    case "GET_USER":
      console.log({ payload: action.payload });
      return {
        ...state,
        user: action.payload,
      };
    case "UPDATE_USER":
      console.log({ action: action.payload });
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLogin: action.payload.isLogin,
        token: action.payload.token,
        id: null
      };
    default:
      return state;
  }
};

export default loggedReducer;
