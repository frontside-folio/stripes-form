import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@folio/stripes-components/lib/Modal';
import Button from '@folio/stripes-components/lib/Button';
import css from './StripesFormModal.css';

function StripesFormModal(props) {
  return (
    <Modal onClose={props.closeCB} size="small" open={props.openWhen} label="There are unsaved changes" dismissible>
      <div className={css.stripesFormModal}>
        {props.remoteSave && <Button onClick={props.saveChanges} fullWidth>Save Changes</Button>}
        <Button onClick={props.discardChanges} buttonStyle="secondary" fullWidth>Close without saving</Button>
        <Button onClick={props.closeCB} buttonStyle="primary" fullWidth marginBottom0>Keep editing</Button>
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

export default StripesFormModal;
