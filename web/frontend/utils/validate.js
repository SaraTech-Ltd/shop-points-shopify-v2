import _ from 'lodash';

export const tireFormValidate = (values) => {
  const _errors = {};
  if (_.isEmpty(values.name)) {
    _errors['name'] = 'Name required!';
  }
  if (_.toNumber(values.point) < 1) {
    _errors['point'] = 'Point required!';
  }
  if (_.toNumber(values.amount) < 1) {
    _errors['amount'] = 'Point required!';
  }
  return _errors;
};

export const campaignFormValidate = (values) => {
  const _errors = {};
  if (_.isEmpty(values.name)) {
    _errors['name'] = 'Name required!';
  }
  if (_.toNumber(values.point) < 1) {
    _errors['point'] = 'Point required!';
  }
  if (_.isEmpty(values.endAt)) {
    _errors['endAt'] = 'End date required!';
  }
  return _errors;
};
