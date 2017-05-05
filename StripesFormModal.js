import React, { Component, PropTypes } from 'react';
import { isDirty } from 'redux-form';

import Modal from '@folio/stripes-components/lib/Modal';
import Button from '@folio/stripes-components/lib/Button';

import css from './StripesFormModal.css';

export default class StripesFormModal extends Component {
    render() {
        return (
            <Modal open={this.props.openWhen} label="There are unsaved changes">
                {this.props.remoteSave && <Button onClick={this.props.saveChanges}>Save Changes</Button>}
                <Button onClick={this.props.discardChanges}>Discard Changes</Button>
                <Button onClick={this.props.closeCB}>Cancel</Button>
            </Modal>
        ); 
    };
}
