import { v4 as uuidV4 } from 'uuid';

export const uuidGenerator = (): string => {
  return uuidV4();
};
