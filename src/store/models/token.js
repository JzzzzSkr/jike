import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
import { setToken as setLocalStoreToken, getToken } from "@/utils";
import { loginAPI,getUserInfoAPI } from "@/apis/user";

// console.log(typeof getToken());

const userRedux = createSlice({
  name: "token",
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },
  reducers: {
    // 同步修改方法
    setToken(state, action) {
      state.token = action.payload;
      setLocalStoreToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    }
  },
});

// 解构actionCreater函数并重命名以避免冲突
const { setToken: setTokenAction } = userRedux.actions;

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await loginAPI(loginForm);
    dispatch(setTokenAction(res.data.token)); // 使用重命名后的action
  };
};

const { setUserInfo: setUserInfoAction } = userRedux.actions;

const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await getUserInfoAPI();
    dispatch(setUserInfoAction(res.data));
  };
};

export { fetchLogin, fetchUserInfo };
export default userRedux.reducer;
