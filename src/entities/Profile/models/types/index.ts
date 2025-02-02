export enum Currency {
  RUB = "RUB",
  TG = "TG",
  EUR = "EUR",
  SUM = "SUM",
}

export enum Country {
  Russia = "Russia",
  Kazakhstan = "Kazakhstan",
  Armenia = "Armenia",
  Uzbekistan = "Uzbekistan",
}

export interface IProfile {
  _id?: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  city?: string;
  username?: string;
  avatar?: string;

  currency?: Currency;
  country?: Country;
}

export interface IProfileSchema {
  profile: IProfile | null;
  formProfile: IProfile | null;
  isLoading: boolean;
  isLoadingUpdate: boolean;
  error?: string;
  errorUpdate?: string;
  disabled: boolean;
}
