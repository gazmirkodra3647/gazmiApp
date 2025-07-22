import { useMemo } from 'react';
import TokenListPlaceholder from './token-list-placeholder.component';

const OptimizedTokenListPlaceholder = () => {
  const memoizedComponent = useMemo(() => <TokenListPlaceholder />, []);

  return memoizedComponent;
};

export default OptimizedTokenListPlaceholder;
