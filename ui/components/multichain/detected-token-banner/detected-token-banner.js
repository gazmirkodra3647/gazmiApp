
```jsx
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useI18nContext } from '../../../hooks/useI18nContext';
import {
  getCurrentChainId,
  getNetworkConfigurationsByChainId,
} from '../../../../shared/modules/selectors/networks';
import {
  getDetectedTokensInCurrentNetwork,
  getAllDetectedTokensForSelectedAddress,
  getIsTokenNetworkFilterEqualCurrentNetwork,
} from '../../../selectors';
import { MetaMetricsContext } from '../../../contexts/metametrics';
import {
  MetaMetricsEventCategory,
  MetaMetricsEventName,
  MetaMetricsTokenEventSource,
} from '../../../../shared/constants/metametrics';
import { BannerAlert } from '../../component-library';

export const DetectedTokensBanner = ({
  className,
  actionButtonOnClick
}) => {
    const t = useI18nContext();
    const trackEvent = useContext(MetaMetricsContext);
    const isTokenNetworkFilterEqualCurrentNetwork = useSelector(
      getIsTokenNetworkFilterEqualCurrentNetwork
    );
    const detectedTokens = useSelector(getDetectedTokensInCurrentNetwork);
    const detectedTokensMultichain = useSelector(
      getAllDetectedTokensForSelectedAddress
    );
    const chainId = useSelector(getCurrentChainId);

    let tokensDetails;
    let total;

if (process.env.PORTFOLIO_VIEW && !isTokenNetworkFilterEqualCurrentNetwork) {
tokensDetails =
Object.values(detectedTokensMultichain).flat().map(({ address, symbol }) => `${symbol} - ${address}`);
total =
Object.values(detectedTokensMultichain).reduce((count, tokenArray) => count + tokenArray.length,0)
}
else{
tokensDetails =
detectedTokens.map(({ address, symbol }) => `${symbol} - ${address}`);
total = detectedTokens.length;
}

return (
<BannerAlert
className={classNames('multichain-detected-token-banner', className)}
actionButtonLabel={t('import_tokens_camel_case')}
actionButtonOnClick={handleOnClick}
data-testid="detected-token-banner"
>
{t(totals ===1 ?'numberOfNewTokendsDetec tedSingular' : `numberOfNewTokendsDetect edPlural`, [totals])}
</BannerAlert>
);
};
