import { createContext, useState, useContext } from "react";

const UserContext = createContext();

const testUser = {
  username: "jessjelly",
  name: "Jess Jelly",
  avatar_url: "https://example.com/avatar.jpg",
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(testUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
