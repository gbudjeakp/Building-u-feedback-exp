const getApiEndpoint = () => {
  if (import.meta.env.VITE_ENVIRONMENT === "production") {
    return import.meta.env.VITE_API_ENDPOINT_PROD;
  } else {
    return import.meta.env.VITE_API_ENDPOINT_DEV;
  }
};

export const baseUrl = getApiEndpoint();
