import { TireTypes, SettingsTypes, NotificationTypes } from '../reducers';

export const fetchTiers = (data) => ({ type: TireTypes.FETCH_TIER, payload: data });

export const addTire = (data) => {
  return { type: TireTypes.ADD_TIRE, payload: data };
};

export const updateTire = (data) => {
  return { type: TireTypes.UPDATE_TIRE, payload: data };
};

export const updateTireSettings = (value) => ({ type: TireTypes.UPDATE_TIRE_SETTINGS, payload: value });

export const updateSettings = (settings) => ({ type: SettingsTypes.UPDATE_SETTINGS, payload: settings });

export const removeNotification = (id) => ({ type: NotificationTypes.REMOVE_NOTIFICATION, payload: id });

export const addNotification = ({ message, error = false }) => ({
  type: NotificationTypes.ADD_NOTIFCATION,
  payload: { message, error, id: new Date().valueOf() },
});
