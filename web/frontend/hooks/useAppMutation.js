import { useAuthenticatedFetch } from './useAuthenticatedFetch';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useMutation } from 'react-query';

import axios from 'axios';
import { getSessionToken } from '@shopify/app-bridge-utils';
import { useAppBridge } from '@shopify/app-bridge-react';

import instance from '../request/axiosInstance';

/**
 * A hook for querying your custom app data.
 * @desc A thin wrapper around useAuthenticatedFetch and react-query's useQuery.
 *
 * @param {Object} options - The options for your query. Accepts 3 keys:
 *
 * 1. url: The URL to query. E.g: /api/widgets/1`
 * 2. fetchInit: The init options for fetch.  See: https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters
 * 3. reactQueryOptions: The options for `useQuery`. See: https://react-query.tanstack.com/reference/useQuery
 *
 * @returns Return value of useQuery.  See: https://react-query.tanstack.com/reference/useQuery.
 */

export const useAppMutation = () => {
  // const instance = axios.create();
  const app = useAppBridge();
  instance.interceptors.request.use(function (config) {
    return getSessionToken(app) // requires an App Bridge instance
      .then((token) => {
        // append your request headers with an authenticated token
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
      });
  });

  const { mutateAsync, ...mutationProps } = useMutation(async ({ url, data = {}, method = 'POST' }) => {
    let response;
    if (method === 'PUT') {
      response = await instance.put(url, data);
    } else if (method === 'DELETE') {
      response = await instance.delete(url, data);
    } else {
      response = await instance.post(url, data);
    }
    return response;
  });
  return [mutateAsync, mutationProps];
};
