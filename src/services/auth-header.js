// import { useNavigate } from 'react-router';

export default function authHeader() {
  // const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('token'));
  if (user && user.token) {
    // const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    // if (currentTime > user.expiresIn) {
    //   localStorage.removeItem('token');
    // } else {
    // Token still valid, return Authorization header
    return { Authorization: 'Bearer ' + user.token };
    // }
  }
  return {};
}
