import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
import { setToken as setLocalStoreToken, getToken } from "@/utils";

// console.log(typeof getToken());

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: getToken() || "",
  },
  reducers: {
    // 同步修改方法
    setToken(state, action) {
      state.token = action.payload;
      setLocalStoreToken(action.payload);
    },
  },
});

// 解构actionCreater函数并重命名以避免冲突
const { setToken: setTokenAction } = tokenSlice.actions;

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post("/authorizations", loginForm);
    dispatch(setTokenAction(res.data.token)); // 使用重命名后的action
  };
};

export { fetchLogin };
export default tokenSlice.reducer;
