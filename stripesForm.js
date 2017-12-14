import React from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import { connect } from '@folio/stripes-connect'; // eslint-disable-line
import StripesFormWrapper from './StripesFormWrapper';

export default function stripesForm(opts) {
  return (Form) => {
    const StripesForm = props => <StripesFormWrapper {...props} Form={Form} formOptions={opts} />;
    opts = Object.assign({}, opts, {
      onSubmitFail: (errors, dispatch, submitError) => {
        if (submitError && !(submitError instanceof SubmissionError)) {
          console.error(submitError); // eslint-disable-line
          throw new SubmissionError({ message: submitError.message });
        } else {
          console.warn(errors); // eslint-disable-line
        }
      }
    });
    return reduxForm(opts)(StripesForm);
  };
}
