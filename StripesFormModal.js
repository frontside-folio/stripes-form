import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';
import ConfirmationModal from '@folio/stripes-components/lib/ConfirmationModal';

function StripesFormModal(props, context) {
  const unsavedChangesMsg = context.intl.formatMessage({ id: 'stripes-form.unsavedChanges' });

  return (
    <ConfirmationModal
      open={props.openWhen}
      heading={unsavedChangesMsg}
      onConfirm={props.closeCB}
      onCancel={props.discardChanges}
      confirmLabel={<FormattedMessage id="stripes-form.keepEditing" />}
      cancelLabel={<FormattedMessage id="stripes-form.closeWithoutSaving" />}
    />
  );
}

StripesFormModal.propTypes = {
  openWhen: PropTypes.bool,
  saveChanges: PropTypes.func,
  discardChanges: PropTypes.func,
  closeCB: PropTypes.func,
  remoteSave: PropTypes.bool,
};
StripesFormModal.contextTypes = {
  intl: intlShape,
};

export default StripesFormModal;
