interface SharedState {
    [key: string]: any;
  }
  
  const sharedState: SharedState = {};
  
  export const get = (key: string): any => {
    return sharedState[key];
  };
  
  export const set = (key: string, value: any): void => {
    sharedState[key] = value;
  };
  