const initialState = {
	isLoading: false,
	isLicense: false,
};

export const Types = {
	START_LOADING: 'START_LOADING',
	LOAD_LICENSE: 'LOAD_LICENSE',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case Types.LOAD_LICENSE:
			return { ...state, isLicense: action.payload };
		default:
			return state;
	}
};
