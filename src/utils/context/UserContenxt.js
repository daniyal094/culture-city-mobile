import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext();
const UserUpdateContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const useUserUpdate = () => {
  return useContext(UserUpdateContext);
};

export const UserProvider = ({children}) => {
  const [user, setuser] = useState({
    user: {},
    token: '',
    role: '',
  });
  const updateUser = data => {
    setuser(data);
  };
  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={updateUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
};
