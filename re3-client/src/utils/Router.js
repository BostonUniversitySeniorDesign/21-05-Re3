import {
  useHistory,
  useLocation,
  // useParams,
  useRouteMatch
} from 'react-router';
import { useMemo } from 'react';

const useRouter = () => {
  //const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const router = () => {
    return {
      // For convenience add push(), replace(), pathname at top level
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      match,
      location,
      history
    };
  };

  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  // return useMemo(router, [params, match, location, history]);
  return useMemo(router, [match, location, history]);
};

export default useRouter;
