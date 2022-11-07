import * as request from "./request";

export const get = async (id = "") => {
  try {
    const res = await request.get(`categories?l_id=${id}`);
    return res;
  } catch (error) {
    //todo write log
  }
};

export const getByName = async (name = "") => {
  try {
    const res = await request.get(`categories?l_ten=${name}`);
    return res;
  } catch (error) {
    //todo write log
  }
};

export const post = async (data, headers) => {
  try {
    await request.post("categories", data, headers);
  } catch (error) {
    //todo write log
  }
};

export const patch = async (id, data, headers) => {
  try {
    await request.patch(`categories/${id}`, data, headers);
  } catch (error) {
    //todo write log
  }
};

export const _delete = async (id) => {
  try {
    await request._delete(`categories/${id}`);
  } catch (error) {
    //todo write log
  }
};
