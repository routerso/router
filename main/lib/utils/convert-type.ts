/**
 *
 * @param data
 * @param schema
 * @returns
 */

export const convertToCorrectTypes = (data: any, schema: GeneralSchema[]) => {
  const result: any = {};

  schema.forEach(({ key, value }) => {
    if (value === "boolean") {
      // Convert "true" and "false" strings to boolean values
      result[key] = data[key] === "true";
    } else if (value === "number") {
      // Convert string to number, ensuring NaN is handled appropriately
      const num = Number(data[key]);
      result[key] = isNaN(num) ? undefined : num;
    } else {
      // For all other types, assume string or no conversion needed
      result[key] = data[key];
    }
  });

  return result;
};
