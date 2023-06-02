let userData = localStorage.getItem("userData") 
userData = (userData != null) ? JSON.parse(userData) : { isLogged: false, token: null, id: null }
let { isLogged, token, id } = userData


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
