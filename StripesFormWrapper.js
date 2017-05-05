import React, { Component, PropTypes } from 'react';
import { isDirty } from 'redux-form';

import { withRouter } from 'react-router'
import { submit } from 'redux-form';

import {Prompt} from 'react-router-dom'


import StripesFormModal from './StripesFormModal';

class StripesFormWrapper extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            openModal: false,
            isBlocking: false,
            nextLocation: null
        }

        this.saveChanges = this.saveChanges.bind(this);
        this.continue = this.continue.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    componentDidMount() {
        if(this.props.formOptions.navigationCheck) {
            this.unblock = this.props.history.block((nextLocation)=>{
                if(this.props.dirty) {
                    this.setState({
                        openModal: true,
                        nextLocation: nextLocation
                    });
                }
                return !this.props.dirty;
            });
        }
    }

    componentWillUnmount(...args) {
        if(this.props.formOptions.navigationCheck) {
            this.unblock();
        }
    }

    saveChanges() {
        console.log(submit);
        this.props.dispatch(submit(this.props.formOptions.form));

        if(this.props.invalid) {
            this.closeModal();
        } else {
            this.continue();            
        }

    }

    continue() {
        this.unblock();
        this.props.history.push(this.state.nextLocation.pathname);
    }

    closeModal() {
        this.setState({
            openModal: false
        });
    }

    render() {  
        return (
           <div style={{ width: '100%', minWidth: this.state.contentMinWidth, height: '100%', overflow: 'auto' }}>
                <this.props.Form {...this.props } />
                <StripesFormModal 
                    openWhen={this.state.openModal} 
                    saveChanges={this.saveChanges} 
                    discardChanges={this.continue}
                    closeCB={this.closeModal} 
                />
            </div>
        );
    };

}

export default withRouter(StripesFormWrapper);