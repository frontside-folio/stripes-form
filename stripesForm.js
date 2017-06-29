import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from '@folio/stripes-connect'; // eslint-disable-line
import StripesFormWrapper from './StripesFormWrapper';

export default function stripesForm(opts) {
  return (Form) => {
    const StripesForm = props => <StripesFormWrapper {...props} Form={Form} formOptions={opts} />;
    return reduxForm(opts)(StripesForm);
  };
}
