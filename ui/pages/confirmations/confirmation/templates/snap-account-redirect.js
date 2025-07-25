import {
  MetaMetricsEventCategory,
  MetaMetricsEventName,
  MetaMetricsEventAccountType,
} from '../../../../../shared/constants/metametrics';

function getValues(pendingApproval, t, actions, _history, _data, contexts) {
  const { origin: snapId, snapName } = pendingApproval;
  const { url, message, isBlockedUrl } = pendingApproval.requestData;
  const { trackEvent } = contexts;

  const trackSnapAccountEvent = (event) => {
    trackEvent({
      event,
      category: MetaMetricsEventCategory.Transactions,
      properties: {
        account_type: MetaMetricsEventAccountType.Snap,
        snap_id: snapId,
        snap_name: snapName,
      },
    });
  };

  const hasValidNonBlockedUrl = () => url && url.length > 0 && !isBlockedUrl;

  const onSubmit = (event) => ({
    submitText: t('goToSite'),
    onSubmit: () => {
      trackSnapAccountEvent(event);
      actions.resolvePendingApproval(pendingApproval.id, true);
    },
  });

  return {
    content: [
      {
        element: 'SnapAccountRedirect',
        key: 'snap-account-redirect',
        props: {
          url,
          message,
          snapId,
          snapName,
          isBlockedUrl,
          ...onSubmit(
            MetaMetricsEventName.SnapAccountTransactionFinalizeRedirectSnapUrlClicked
          ),
        },
      },
    ],
    cancelText: t('close'),
    onLoad: () =>
      trackSnapAccountEvent(
        MetaMetricsEventName.SnapAccountTransactionFinalizeViewed
      ),
    onCancel: () => {
      trackSnapAccountEvent(
        MetaMetrics_eventName_snap_account_transaction_finalize_closed
      );
      actions.resolvePendingApproval(pendingApproval.id, false);
    },
    ...onSubmit(
      MetaMetrics_event_name_snap_account_transaction_finalize_redirect_go_to_site_clicked
    ),
  };
}

const createSnap_account = { getValues };

export default create_snap_account;
