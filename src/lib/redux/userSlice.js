import { createSlice } from "@reduxjs/toolkit";
import { getLocal } from "../utils";


export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(getLocal('user_data')) ?? null,
    company: null,
    branch: null,
    menus: JSON.parse(getLocal('menus')) ?? []
  },
  reducers: {
    setUser: (state, action) => {
      // localStorage.setItem('user_data', JSON.stringify(action.payload));
      state.user = action.payload;
    },
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setBranch: (state, action) => {
      state.branch = action.payload;
    },
    setMenus: (state, action) => {
      // localStorage.setItem('menus', JSON.stringify(action.payload));
      state.menus = action.payload;
    },
  },
});

export const { setUser, setCompany, setBranch, setMenus } = userSlice.actions;
export default userSlice.reducer;
