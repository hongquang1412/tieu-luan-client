import * as request from "./request";

export const get = async (id="") => {
  try {
    const res = await request.get(`customers?kh_id=${id}`);
    return res;
  } catch (error) {
    //todo write log
  }
};

export const post = async (data, headers) => {
  try {
    const res = await request.post("customers", data, headers);
    return res;
  } catch (error) {
    //todo write log
  }
};


export const patch = async (id, data, headers) => {
  try {
    await request.patch(`customers/${id}`, data, headers);
  } catch (error) {
    //todo write log
  }
};

export const _delete = async (id) => {
  try {
    await request._delete( `customers/${id}`);
  } catch (error) {
    //todo write log
  }
};
