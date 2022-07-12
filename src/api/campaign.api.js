/* eslint-disable import/no-anonymous-default-export */
import { message } from "antd";
import axios from "axios";

const SpamAPI = {
  createSpamHotline: async (params) => {
    try {
      const response = await axios.request({
        method: 'POST',
        baseURL: process.env.REACT_APP_BASE_URL,
        url: `/create-spam`,
        data: params
      })
      return response
    } catch (error) {
      message.error('Error')
      throw error
    }
  },
getAllSpamList : async () => {
    try {
      const response = await axios.request({
        method: 'GET',
        baseURL: process.env.REACT_APP_BASE_URL,
        url: `/getspamhotline`,
      })
      return response
    } catch (error)
    
    {
      console.log(error)
      message.error('Error')
      throw error
    }
  }
};

export default SpamAPI;
