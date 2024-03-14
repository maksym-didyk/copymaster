export interface UserDataType {
  body: {
    email: string;
    nickname: string;
    telegram: string;
  }
}

export interface IsUserAuthorized {
  body: {
    authorized: boolean;
  }
  error: string | null;
}

export interface UserPostDataType {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface MarketsSpotType {
  body: {
    market: string;
    symbol: string;
    markets: string[];
    symbols: string[];
    symbolPrice: number | null;
    counterEarning: boolean;
    tradeType: string;
    tradeTypes: string[];
  }
}

export interface BalanceTypeBody {
  body: BalanceType;
}

export interface BalanceType {
    first: BalanceTypeData;
    second: BalanceTypeData;
}

export interface BalanceTypeData {
    quantity: number;
    scale: number;
    currency: string;
}

export interface AlertsListType {
  content: AlertsListTypeContent[];
  pageable: {};
  totalElements: number;
  totalPages: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {};
  first: boolean;
  empty: boolean;
  error: string;
}

export interface AlertsListTypeContent {
  id: number;
  market: string;
  symbol: string;
  price: number;
  type: string;
  comment: string;
  favorite: boolean;
  executed: boolean;
  sendToTelegram: boolean;
  error: string;
}