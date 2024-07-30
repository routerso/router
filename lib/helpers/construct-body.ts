export const constructBodyFromURLParameters = (
  searchParams: URLSearchParams
): Record<string, string> => {
  const data: Record<string, string> = {};
  for (const [key, value] of searchParams) {
    data[key] = value;
  }
  return data;
};
