import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';
import Modal from '@folio/stripes-components/lib/Modal';
import Button from '@folio/stripes-components/lib/Button';
import css from './StripesFormModal.css';

function StripesFormModal(props, context) {
  const unsavedChangesMsg = context.intl.formatMessage({ id: 'stripes-form.unsavedChanges' });
  return (
    <Modal onClose={props.closeCB} size="small" open={props.openWhen} label={unsavedChangesMsg} dismissible>
      <div className={css.stripesFormModal}>
        {
          props.remoteSave && <Button onClick={props.saveChanges} fullWidth><FormattedMessage id="stripes-form.saveChanges" /></Button>
        }
        <Button onClick={props.discardChanges} fullWidth>
          <FormattedMessage id="stripes-form.closeWithoutSaving" />
        </Button>
        <Button onClick={props.closeCB} buttonStyle="primary" fullWidth marginBottom0>
          <FormattedMessage id="stripes-form.keepEditing" />
        </Button>
      </div>
    </Modal>
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
