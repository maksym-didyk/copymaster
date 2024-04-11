import { createContext, useState } from "react";

// Определяем тип контекста
type AlertsNotSeenContextType = {
  alertsNotSeenList: number[];
  setAlertsNotSeenList: (elements: number[]) => void;
};

// Создаем контекст и начальными значениями по умолчанию
const AlertsNotSeenContext = createContext<AlertsNotSeenContextType>({
  alertsNotSeenList: [],
  setAlertsNotSeenList: () => {}
});

// Создаем компонент провайдера, который предоставляет данные контекста всем дочерним компонентам
export const AlertsNotSeenProvider = ({ children }: { children: JSX.Element }) => {
  const [alertsNotSeenList, setAlertsNotSeenList] = useState<number[]>([]);
  
  // Возвращаем контекст провайдера, передавая значения в качестве значения контекста
  return (
    <AlertsNotSeenContext.Provider value={{alertsNotSeenList, setAlertsNotSeenList}}>
      {children}
    </AlertsNotSeenContext.Provider>
  );
};

export default AlertsNotSeenContext;
