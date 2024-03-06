import axios from 'axios';

const GetRequest = async (url, headers = {}) => {
    try {
        const response = await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        });

        return response.data;
    } catch (error) {
        // Handle errors
        console.error('Error:', error.response ? error.response.data : error.message);
        throw error;
  }
};

export default GetRequest;