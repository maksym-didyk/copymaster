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
  pageSize: number;
  totalRecords: number;
  lastPageNumber: number;
  pageNumber: number;
  error: string;
}

export interface AlertsListTypeContent {
  id: number;
  market: string;
  symbol: string;
  price: number;
  type: string;
  informing: string;
  comment: string;
  favorite: boolean;
  executed: boolean;
  marketPricePosition: string;
  active: boolean;
  sendToTelegram: boolean;
  error: string;
}