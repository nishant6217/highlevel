/**
 * @template T return type
 * @param str input string
 * @returns parsed object or string
 */
export const parseOrReturnJson = <T = unknown>(str: string | T): T => {
  try {
    return JSON.parse(str as string) as T;
  } catch (e) {
    return str as T;
  }
};

/**
 *
 * @param str input string
 * @returns {any | null} parsed object or null
 */
export const parseOrReturnNull = <T = unknown>(
  str?: string | null
): T | null => {
  if (!str) {
    return null;
  }

  try {
    const parseObject = JSON.parse(str) as T;

    // to handle if str comes as a number
    return typeof parseObject === "object" ? parseObject : null;
  } catch (e) {
    return null;
  }
};

export const isProduction = () => process.env.SERVER_TYPE === "production";

export const getLimitAndOffset = (
  page: string | number = 1,
  pageSize: string | number = 20
): { offset: number; limit: number } => {
  const pageSizeNumber = Number(pageSize);
  const pageNumber = Number(page);

  const limit =
    pageSizeNumber <= 0 || pageSizeNumber > 500 ? 20 : pageSizeNumber;
  const derivedPage = pageNumber <= 0 ? 1 : pageNumber;

  const offset = (derivedPage - 1) * limit;

  return { offset, limit };
};
