# stripes-form
A redux-form wrapper for Stripes

**Usage:**

    StripesForm({
	  ...options
	})(StripesComponent);

The options are passed through to ReduxForm, so any applicable form options can be used here. In addition to the ReduxForm options there are the following Stripes-Form specific options:

    {navigationCheck: [true *defaults to false]}
   
   This option will cause Stripes Form to do a dirty check on the form and in a case where there is unsaved data the user is promoted before navigating from the form.
   
    {allowRemoteSave: [true *defaults to false]}
   
   This option will cause the navigation prompt to include a "Save Data" option which will remotely submit the form. This will only result in a persistence of the form data if persistence of the form's data is triggered by a form submission.
