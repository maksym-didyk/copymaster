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