import { HYMNAL_ADDRESS } from '../config/server';
import ApiError from './ApiError';
import React from 'react';

export default class ApiClient {
  constructor() {
  }

  async doRequest(resource, options = {}) {
    let url = `${HYMNAL_ADDRESS}/api/${resource}`;
    let response = await fetch(url, options);
    if (!response.ok) {
      throw new ApiError(`Request to ${url} returned error: ${response.status} ${response.statusText}`);
    }
    return response;
  }
};
