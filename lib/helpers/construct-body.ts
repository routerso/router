/**
 * Constructs a body object from URL parameters.
 *
 * @param searchParams - The URLSearchParams object containing the parameters.
 * @returns A record object with key-value pairs representing the parameters.
 */
export const constructBodyFromURLParameters = (
  searchParams: URLSearchParams
): Record<string, string> => {
  const data: Record<string, string> = {};
  for (const [key, value] of searchParams) {
    data[key] = value;
  }
  return data;
};
