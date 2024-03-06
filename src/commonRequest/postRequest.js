import axios from 'axios';

const PostRequest = async (url, data, headers = {}) => {
    try {
        const response = await axios.post(url, data, {
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

export default PostRequest;