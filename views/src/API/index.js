const getApiEndpoint = () => {
  //Could get env variables to work so just hard coding for now
  //Will need to come back and fix this
    if (process.env.NODE_ENV === 'production') {
      return "https://building-u-feedback-api.onrender.com";
    } else {
      return import.meta.env.VITE_API_ENDPOINT_DEV;
    }
  };
  
  export const baseUrl = getApiEndpoint();
  