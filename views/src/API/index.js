const getApiEndpoint = () => {
    if (process.env.NODE_ENV === 'production') {
      return "https://your-production-api-endpoint.com";
    } else {
      return import.meta.env.VITE_API_ENDPOINT_DEV;
    }
  };
  
  export const baseUrl = getApiEndpoint();
  