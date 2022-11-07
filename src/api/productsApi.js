import * as request from "./request";

export const get = async (id = "") => {
  try {
    const res = await request.get(`products?sp_id=${id}`);
    return res;
  } catch (error) {
    //todo write log
  }
};

export const search = async (p) => {
  try {
    const res = await request.get(`products/search?p=${p}`);
    return res;
  } catch (error) {
    //todo write log
  }
};

export const post = async (data, headers) => {
  try {
    await request.post("products", data, headers);
  } catch (error) {
    //todo write log
  }
};

export const patch = async (id, data, headers) => {
  try {
    await request.patch(`products/${id}`, data, headers);
  } catch (error) {
    //todo write log
  }
};

export const _delete = async (id) => {
  try {
    await request._delete(`products/${id}`);
  } catch (error) {
    //todo write log
  }
};
