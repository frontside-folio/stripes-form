import React, { Component, PropTypes } from 'react';
import { isDirty } from 'redux-form';

import Modal from '@folio/stripes-components/lib/Modal';
import Button from '@folio/stripes-components/lib/Button';
import css from './StripesFormModal.css';

export default class StripesFormModal extends Component {
    render() {
        return (
            <Modal onClose={this.props.closeCB} size="small" open={this.props.openWhen} label="There are unsaved changes" dismissible>
                <div className={css.stripesFormModal}>
                    {this.props.remoteSave && <Button onClick={this.props.saveChanges} fullWidth>Save Changes</Button>}
                    <Button onClick={this.props.discardChanges} fullWidth>Discard Changes</Button>
                    <Button onClick={this.props.closeCB} buttonStyle="secondary" fullWidth>Cancel</Button>
                </div>
            </Modal>
        ); 
    };
}
