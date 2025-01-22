export const settingsReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TAB":
      const { key, tab } = action.payload;
      return { ...state, [key]: tab };
      // case "UPDATE_LOCALE":
      //   const { value } = action.payload;
      //   return { ...state, locale: value };  
    default:
      state;
  }
};
