import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  theme: "light" | "synthwave";
}

const initialState: ThemeState = {
  theme: (localStorage.getItem("theme") === "synthwave"
    ? "synthwave"
    : "light") as "light" | "synthwave",
};

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    ToggleTheme(state) {
      state.theme = state.theme === "light" ? "synthwave" : "light";
      localStorage.setItem("theme", state.theme);
    },
    SetTheme(state, action: PayloadAction<"light" | "synthwave">) {
      state.theme = action.payload;
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { ToggleTheme, SetTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
