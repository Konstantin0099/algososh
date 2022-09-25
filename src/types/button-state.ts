export interface ButtonState {
    [name: string]: {
      isDisabled: boolean;
      isLoading?: boolean;
    };
  }