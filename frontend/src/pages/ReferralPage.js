import { useLocation, Navigate } from 'react-router-dom';
import { PATH_AUTH } from 'src/routes/paths';
export default function ReferralPage() {
  const { search } = useLocation();
  const referrerId = search.split('=')[1];
  localStorage.setItem('referrerId', referrerId);

  return <Navigate to={PATH_AUTH.register} replace="true" />;
}
