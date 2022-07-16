import { TireTypes, SettingsTypes } from '../reducers';

export const addTire = (data) => {
	return { type: TireTypes.ADD_TIRE, payload: data };
};

export const updateTire = (data) => {
	return { type: TireTypes.UPDATE_TIRE, payload: data };
};

export const updateTireSettings = (value) => ({ type: TireTypes.UPDATE_TIRE_SETTINGS, payload: value });

export const updateSettings = (settings) => ({ type: SettingsTypes.UPDATE_SETTINGS, payload: settings });
