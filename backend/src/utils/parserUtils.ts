import { ZodSchema } from "zod";
import fs from "fs/promises";
import fetch from "node-fetch";

/**
 * Parses a CSV string into an array of validated objects using a Zod schema.
 *
 * - Fetches the CSV content via the provided `getCSVText` function.
 * - Splits the CSV into lines and maps each row to an object using the header (how would we determine when there is a header?).
 * - Validates each row against the provided Zod schema.
 *
 * @param getCSVText - Async function that returns the CSV text.
 * @param schema - Zod schema used to validate each row.
 * @returns Promise resolving to an array of validated objects.
 */
export async function parseCSV<T>(
  getCSVText: () => Promise<string>,
  schema: ZodSchema<T>
): Promise<T[]> {
  const csv = await getCSVText();
  //TODO: use your CSV here, you may need to adapt it so read carefully what functions use this method and look at what we pass in!!!
  return [];
}

/**
 * Returns a function that reads CSV content from a local file.
 *
 * @param filePath - Path to the local CSV file.
 * @returns Function that resolves to the CSV text when called.
 */
export const getFromFile = (filePath: string) => () =>
  fs.readFile(filePath, "utf-8");

/**
 * Returns a function that fetches CSV content from a remote API.
 *
 * @param url - URL to fetch the CSV from.
 * @returns Async function that resolves to the CSV text when called.
 * @throws Error if the fetch response is not OK.
 */
export const getFromAPI = (url: string) => async () => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch CSV: ${res.status}`);
  return res.text();
};
