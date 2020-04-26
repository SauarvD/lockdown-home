const initialState = {
  data: {}
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "SPEAK":
      return {
        data: action.payload
      }
    default:
      return {
          data: action.payload
      }
  }
}

export default rootReducer;
