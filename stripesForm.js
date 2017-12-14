import React from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import StripesFormWrapper from './StripesFormWrapper';

const optWithOnSubmitFail = opts => Object.assign({}, opts, {
  onSubmitFail: (errors, dispatch, submitError) => {
    if (submitError && !(submitError instanceof SubmissionError)) {
      // eslint-disable-next-line no-console
      console.error(submitError);
      throw new SubmissionError({ message: submitError.message });
    } else {
      // eslint-disable-next-line no-console
      console.warn(errors);
    }
  },
});

export default function stripesForm(opts) {
  return (Form) => {
    const StripesForm = props => <StripesFormWrapper {...props} Form={Form} formOptions={opts} />;
    return reduxForm(optWithOnSubmitFail(opts))(StripesForm);
  };
}
