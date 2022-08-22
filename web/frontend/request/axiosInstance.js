import Axios from 'axios';
import { getSessionToken } from '@shopify/app-bridge-utils';
import { useAppBridge } from '@shopify/app-bridge-react';
import store from '../store';
import { NotificationTypes } from '../store/reducers';
import first from 'lodash/first';

const instance = Axios.create();

// instance.interceptors.request.use((config) => {
//   const app = useAppBridge();

//   return getSessionToken(app) // requires an App Bridge instance
//     .then((token) => {
//       // append your request headers with an authenticated token
//       console.log('found token: ', token);
//       config.headers['Authorization'] = `Bearer ${token}`;
//       return config;
//     });
// });

instance.interceptors.response.use(
  async (response) => {
    console.debug('****** API Response ******', response);
    return response;
  },
  async (error) => {
    if (error instanceof Axios.Cancel && !error.message) {
      error.message = 'Request cancelled';
    }

    if (error?.response?.status === 401) {
      store.dispatch({
        type: NotificationTypes.ADD_NOTIFCATION,
        payload: { message: 'Invalid Credentials', error: true, id: new Date().valueOf() },
      });

      return Promise.resolve(error.response);
    }

    const errMessage = error?.response?.data?.message || error?.response?.data?.errorMessage;

    const msg = typeof errMessage === 'string' ? errMessage : first(Object.values(errMessage || {}));

    if (msg) {
      store.dispatch({
        type: NotificationTypes.ADD_NOTIFCATION,
        payload: { message: msg, error: true, id: new Date().valueOf() },
      });
    }

    console.debug('****** API Response Error ******', error);

    return Promise.reject(error);
  },
);

export default instance;
