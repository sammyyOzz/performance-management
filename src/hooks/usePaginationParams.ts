type SearchParamsType = Record<string, string | number>;

export const setPaginationParams = ( params: SearchParamsType, searchParams: URLSearchParams, setSearchParams: (value: SearchParamsType) => void) => {
  // Convert existing search params to an object
  const queryParams = Object.fromEntries(searchParams.entries());

  // Update with new params
  const updatedParams = {
    ...queryParams,
    ...Object.entries(params).reduce((acc, [key, value]) => {
      acc[key] = value.toString(); // Ensure all values are strings
      return acc;
    }, {} as SearchParamsType),
  };

  // Update the search params
  setSearchParams(updatedParams);
};

export const getPaginationParams = (searchParams: URLSearchParams, defaultParams: SearchParamsType = {}): SearchParamsType => {
  // Convert search params to an object
  const queryParams = Object.fromEntries(searchParams.entries());

  // Only apply default values if the key does not exist in the URL
  return Object.keys(defaultParams).reduce((acc, key) => {
    acc[key] = queryParams[key] !== undefined ? queryParams[key] : defaultParams[key];
    return acc;
  }, {} as SearchParamsType);
};

export const updateQueryParams = (newParams: Record<string, string | number>) => {
  const searchParams = new URLSearchParams(window.location.search);
  const setSearchParams = (params: SearchParamsType) => {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value.toString());
    });
    window.history.replaceState(null, '', url.toString());
  };

  setPaginationParams(newParams, searchParams, setSearchParams);
};