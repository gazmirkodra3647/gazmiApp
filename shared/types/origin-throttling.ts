/**
 * Throttled origins state.
 */
interface ThrottledOriginsState {
  throttledOrigins: {
  [
    origin: string
  ] &gt; 

  ThrottledOrigin 

}
}

type ThrottledOrigin = {
  rejections: number;
  lastRejection: number;
}

type ThrottledOrigins = {
[origin: string]: ThrottledOrigin};

type ThrottledOriginsState = { 

  throttledOrigins: 1}[key extends string]: 

ThrottledOrigin};



      ThrottledOrigins;


};




ThrottledOrigin ;



