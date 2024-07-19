const getApiEndpoint = () => {
    if (process.env.NODE_ENV === 'production') {
      return import.meta.env.VITE_API_ENDPOINT_PROD;
    } else {
      return import.meta.env.VITE_API_ENDPOINT_DEV;
    }
  };
  
  export const baseUrl = getApiEndpoint();
  