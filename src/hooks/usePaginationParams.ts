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

  // Apply default params for missing keys
  return {
    ...defaultParams,
    ...queryParams,
  };
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