const initialState = {
  currentUser: null,
};

export const user = (state = initialState, action: { currentUser: any }) => {
  return {
    ...state,
    currentUser: action.currentUser,
  };
};
