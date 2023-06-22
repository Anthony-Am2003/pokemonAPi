import { Navigate } from 'react-router-dom';

const NotFound = () => {
    return (
      <Navigate to="/home/0" replace state={{ error: true }} />
    );
  }

  export default NotFound