export const Types = {
  ADD_NOTIFCATION: 'ADD_NOTIFCATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
};

export default (state = [], action) => {
  switch (action.type) {
    case Types.REMOVE_NOTIFICATION: {
      const nextState = state.filter((item) => item.id !== action.payload);
      console.log('nexgt: ', nextState);
      return nextState;
    }
    case Types.ADD_NOTIFCATION: {
      return [action.payload, ...state];
    }

    default:
      return state;
  }
};
