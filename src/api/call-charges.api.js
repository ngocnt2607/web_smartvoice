/* eslint-disable import/no-anonymous-default-export */
import { message } from "antd";
import axios from "axios";

class SmartVoiceAPI {
  getAllSmartVoiceList = async () => {
    try {
      const response = await axios.request({
        method: 'GET',
        baseURL: process.env.REACT_APP_BASE_URL,
        url: `getsmartsip?month=202207`,
      })
      return response
    } catch (error) {
      message.error('Error')
      throw error
    }
  }
};

const instance = new SmartVoiceAPI()

export default instance;
