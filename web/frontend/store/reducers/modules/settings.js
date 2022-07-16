const initialState = {
	appSettings: {
		pointSystem: false,
		pointSystemDisplay: false,
	},
	widgetSettings: {
		enable: true,
		lang: 'en',
	},
	orders: {
		isDraftOrder: true,
	},
};

export const Types = {
	UPDATE_SETTINGS: 'UPDATE_SETTINGS',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case Types.UPDATE_SETTINGS:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};
