import _ from 'lodash';

const initialState = {
	default: { id: '0001', name: 'Default', isDefault: true, currencyAmount: 100, pointValue: 1, pointRule: 0 },
	tires: [],
	startDate: { month: 11, year: '2022' },
	activityWindow: 2,
	pickupPeriod: 2,
	pointDelay: 7,
	pointExpired: 2,
};

export const Types = {
	ADD_TIRE: 'ADD_TIRE',
	UPDATE_TIRE: 'UPDATE_TIRE',
	DELETE_TIRE: 'DELETE_TIRE',
	UPDATE_TIRE_SETTINGS: 'UPDATE_TIRE_SETTINGS',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case Types.ADD_TIRE: {
			return { ...state, tires: [action.payload, ...state.tires] };
		}
		case Types.UPDATE_TIRE: {
			const { payload } = action;
			if (payload.isDefault) {
				return { ...state, default: payload };
			} else {
				const nexTires = _.map(state.tires, (tire) => {
					if (tire.id === payload.id) {
						return payload;
					}
					return tire;
				});
				return { ...state, tires: nexTires };
			}
		}
		case Types.DELETE_TIRE: {
			const nextTires = state.tires.filter((tire) => tire.id !== action.tireId);
			return { ...state, tires: nextTires };
		}
		case Types.UPDATE_TIRE_SETTINGS: {
			return { ...state, ...action.payload };
		}
		default:
			return state;
	}
};
