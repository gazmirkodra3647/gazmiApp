export type ThrottledOrigin = {
  rejections: number;
  lastRejection: number;
};

type ThrottledOrigins = Map<string, ThrottledOrigin>;
export type ThrottledOriginsState = {
  throttledOrigins: ThrottledOrigins;
};
