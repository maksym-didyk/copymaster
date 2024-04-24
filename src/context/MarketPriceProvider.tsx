import { createContext, useState } from "react";

// Определяем тип контекста
type MarketPriceContextType = {
  marketPriceContext: number;
  setMarketPriceContext: (value: number) => void;
};

// Создаем контекст и начальными значениями по умолчанию
const MarketPriceContext = createContext<MarketPriceContextType>({
  marketPriceContext: 0,
  setMarketPriceContext: () => {}
});

// Создаем компонент провайдера, который предоставляет данные контекста всем дочерним компонентам
export const MarketPriceProvider = ({ children }: { children: JSX.Element }) => {
  const [marketPriceContext, setMarketPriceContext] = useState(0);
  
  // Возвращаем контекст провайдера, передавая значения в качестве значения контекста
  return (
    <MarketPriceContext.Provider value={{marketPriceContext, setMarketPriceContext}}>
      {children}
    </MarketPriceContext.Provider>
  );
};

export default MarketPriceContext;
