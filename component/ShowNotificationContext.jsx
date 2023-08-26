// contexts/ShowNotificationContext.js

import React, { createContext, useState, useContext ,useEffect} from 'react';

// Create Context object.
export const ShowNotificationContext = createContext();

// Create a provider for components to consume and subscribe to changes.
export const ShowNotificationProvider = ({ children }) => {
  const [notificationState, setNotificationState] = useState({
    isTrue: false,
    text: 'Initial Text',
    color: 'success'
  });

  const [count, setCount] = useState(0);

  return (
    <ShowNotificationContext.Provider value={{ notificationState, setNotificationState, count,setCount }}>
      {children}
    </ShowNotificationContext.Provider>
  );
};

export const useShowNotification = () => {
  const context = useContext(ShowNotificationContext);
  if (!context) {
    throw new Error('useShowNotification must be used within a ShowNotificationProvider');
  }
  return context;
};
