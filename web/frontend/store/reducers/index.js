import { combineReducers } from 'redux';
import app, { Types as AppTypes } from './modules/app';
import tireRules, { Types as TireTypes } from './modules/TireRules';
import settings, { Types as SettingsTypes } from './modules/settings';

const rootReducer = combineReducers({
	app,
	tires: tireRules,
	settings,
});

export { AppTypes, TireTypes, SettingsTypes };

export default rootReducer;
