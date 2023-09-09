import { HttpMethod } from '../Constants/HttpMethod';
import { request } from '../Base/HTTP';
import { generateSearchURL } from '../Util/ServiceUtil';

export async function registration(data) {
  return await request('/api/user', data, HttpMethod.POST);
}

export async function updateUser(data) {
  return await request('/api/user/' + data?.id, data, HttpMethod.PUT);
}

export async function deleteUser(id) {
  return await request('/api/user/' + id, {}, HttpMethod.DELETE);
}

export async function getCurrentUser(data = {}) {
  const urlParams = generateSearchURL(data)
  return await request('/api/user/me?' + urlParams);
}

export async function getAllUsers(data = {}) {
  const urlParams = generateSearchURL(data)
  return await request('/api/users?' + urlParams);
}

export async function getUser(data = {}) {
  const urlParams = generateSearchURL(data)
  return await request('/api/user/' + data?.id + '?' + urlParams);
}