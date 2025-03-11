export const redisKeys = {
  sampleTest: ({ sampleId }) => `sample:${sampleId}`,
} as const;
