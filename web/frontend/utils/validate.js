import _ from 'lodash';

export const tireFormValidate = (values) => {
	const _errors = {};
	if (_.isEmpty(values.name)) {
		_errors['name'] = 'Name required!';
	}
	if (_.toNumber(values.pointRule) < 1) {
		_errors['pointRule'] = 'Point required!';
	}
	if (_.toNumber(values.pointValue) < 1) {
		_errors['pointValue'] = 'Point required!';
	}
	if (_.toNumber(values.currencyAmount) < 1) {
		_errors['currencyAmount'] = 'Point required!';
	}
	return _errors;
};
