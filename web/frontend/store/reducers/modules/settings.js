const initialState = {
  app_settings: {
    pointSystem: false,
    pointSystemDisplay: false,
  },
  widget_settings: { enable: true, language: 'en' },
  order_settings: {
    draftOrder: true,
  },
  tiers: { startMonth: 7, startYear: 2022, activityWindow: 1, period: 1 },
};

export const Types = {
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  FETCH_SETTINGS: 'FETCH_SETTINGS',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.UPDATE_SETTINGS:
      const { payload } = action;
      return { ...state, [payload.key]: payload.value };
    case Types.FETCH_SETTINGS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
