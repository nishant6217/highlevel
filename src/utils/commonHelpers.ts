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
export const parseOrReturnNull = <T = unknown>(str?: string | null): T | null => {
  if (!str) {
    return null;
  }

  try {
    const parseObject = JSON.parse(str) as T;

    // to handle if str comes as a number
    return typeof parseObject === 'object' ? parseObject : null;
  } catch (e) {
    return null;
  }
};

export const isProduction = () => process.env.SERVER_TYPE === 'production';
