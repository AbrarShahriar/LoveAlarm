export const initialState = {
  userId: "",
};

export const ACTIONS = {
  UPDATE_USER_ID: "update_user_id",
};

const reducer = (action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_USER_ID:
      initialState.userId = action.payload.userId;
      break;

    default:
      return initialState;
  }
};
