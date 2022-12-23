import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Container, Alert, AlertTitle } from '@mui/material';
import useAuth from 'src/hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import { PATH_ADMIN } from '../routes/paths';
// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array, // Example ['admin', 'leader']
  children: PropTypes.node
};

const useCurrentRole = () => {
  // Logic here to get current user role
  const { user } = useAuth();
  const role = user?.role;
  return role;
};

export default function RoleBasedGuard({ accessibleRoles, children }) {
  const currentRole = useCurrentRole();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentRole === 'admin') {
      return navigate(PATH_ADMIN.overview, { replace: true });
    }
  }, []);

  if (!accessibleRoles.includes(currentRole)) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}
