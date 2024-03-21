// import { useNavigate } from 'react-router';

export default function authHeader() {
  // const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('token'));
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
    // navigate('/login');
  }
}
