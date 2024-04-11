import { useContext } from 'react';
import AlertsNotSeenProvider from '../context/AlertsNotSeenProvider';

const useAlertSeen = () => {
  return (
    useContext(AlertsNotSeenProvider)
  );
};

export default useAlertSeen;