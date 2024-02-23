import { createContext, useState } from "react";

// Определяем тип контекста
type AuthContextType = {
  isAuthenticated: boolean;
  setAuth: (auth: boolean) => void;
};

// Создаем контекст с типом AuthContextType и начальными значениями по умолчанию
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuth: () => { },
});

// Создаем компонент провайдера, который предоставляет данные контекста всем дочерним компонентам
export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setAuth] = useState<boolean>(false);
  
  // Возвращаем контекст провайдера, передавая значения isAuthenticated и setAuth в качестве значения контекста
  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
