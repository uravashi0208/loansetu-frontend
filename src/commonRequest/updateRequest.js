import axios from 'axios';
import config from '../config';
import authHeader from 'services/auth-header';
var API_URL = config.backendUrl;

const UpdateRequest = async (url, data) => {
  try {
    const response = await axios.put(API_URL + url + data.id, data, { headers: authHeader() });

    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default UpdateRequest;
