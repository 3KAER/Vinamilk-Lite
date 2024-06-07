import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext({
  profile: null,
  setProfile: () => {},
});

export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  const value = {
    profile,
    setProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContext;
