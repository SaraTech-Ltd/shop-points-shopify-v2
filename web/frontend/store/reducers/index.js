import { combineReducers } from 'redux';
import app, { Types as AppTypes } from './modules/app';
import tireRules, { Types as TireTypes } from './modules/TireRules';
import settings, { Types as SettingsTypes } from './modules/settings';
import notifications, { Types as NotificationTypes } from './modules/notifications';

const rootReducer = combineReducers({
  app,
  tires: tireRules,
  settings,
  notifications,
});

export { AppTypes, TireTypes, SettingsTypes, NotificationTypes };

export default rootReducer;
