import { toast } from "react-toastify";
import { client } from "./fetchClient";

export const logout = async () => {
  let status = false;

  try {
    const userData = await client.get<any>('/logout');

    if (userData.body.authorized === false) {
      toast.info('You are logged out');
      status = true;
    } else {
      toast.error('Something went wrong');
      status = false;
    }
  } catch (error) {
    toast.error(`${error}`);
    status = false;
  }

  return status;
};
