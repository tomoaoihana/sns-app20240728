// import { createContext, useState } from "react";

// export const SessionContext = createContext();

// export const SessionProvider = (props) => {
//   const [currentUser, setCurrentUser] = useState();
//   return (
//     <SessionContext.Provider value={{ currentUser, setCurrentUser }}>
//       {props.children}
//     </SessionContext.Provider>
//   );
// };

import { createContext, useState } from "react";

export const SessionContext = createContext();

export const SessionProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();

  return (
    <SessionContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </SessionContext.Provider>
  );
};
