import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { submit } from 'redux-form';
import { injectIntl, intlShape } from 'react-intl';
import { LastVisitedContext } from '@folio/stripes-core/src/components/LastVisited';
import ConfirmationModal from '@folio/stripes-components/lib/ConfirmationModal';

class StripesFormWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      nextLocation: null,
    };

    this.saveChanges = this.saveChanges.bind(this);
    this.continue = this.continue.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    if (this.props.formOptions.navigationCheck) {
      this.unblock = this.props.history.block((nextLocation) => {
        const shouldPrompt = this.props.dirty && !this.props.submitSucceeded;
        if (shouldPrompt) {
          this.setState({
            openModal: true,
            nextLocation,
          });
        }
        return !shouldPrompt;
      });
    }
  }

  componentWillUnmount() {
    if (this.props.formOptions.navigationCheck) {
      this.unblock();
    }
  }

  saveChanges() {
    this.props.dispatch(submit(this.props.formOptions.form));

    if (this.props.invalid) {
      this.closeModal();
    } else {
      this.continue();
    }
  }

  continue(ctx) {
    ctx.cachePreviousUrl();
    this.unblock();

    this.props.history.push(this.state.nextLocation.pathname);
  }

  closeModal() {
    this.setState({
      openModal: false,
    });
  }

  render() {
    const { formOptions: { allowRemoteSave }, intl } = this.props;
    const { openModal } = this.state;

    return (
      <LastVisitedContext.Consumer>
        { ctx => (
          <Fragment>
            <this.props.Form {...this.props} />
            <ConfirmationModal
              open={openModal}
              message={intl.formatMessage({ id: 'stripes-form.unsavedChanges' })}
              heading={intl.formatMessage({ id: 'stripes-form.areYouSure' })}
              onConfirm={allowRemoteSave ? this.saveChanges : this.closeModal}
              onCancel={() => this.continue(ctx)}
              confirmLabel={
                allowRemoteSave ?
                  intl.formatMessage({ id: 'stripes-form.saveChanges' })
                  : intl.formatMessage({ id: 'stripes-form.keepEditing' })
              }
              cancelLabel={intl.formatMessage({ id: 'stripes-form.closeWithoutSaving' })}
            />
          </Fragment>
        )}
      </LastVisitedContext.Consumer>
    );
  }
}

StripesFormWrapper.propTypes = {
  dirty: PropTypes.bool,
  dispatch: PropTypes.func,
  formOptions: PropTypes.shape({
    allowRemoteSave: PropTypes.bool,
    navigationCheck: PropTypes.bool,
    scrollToError: PropTypes.bool,
    form: PropTypes.string,
  }),
  history: PropTypes.shape({
    block: PropTypes.func,
    push: PropTypes.func,
  }),
  intl: intlShape,
  invalid: PropTypes.bool,
  submitSucceeded: PropTypes.bool
};

export default withRouter(injectIntl(StripesFormWrapper));
