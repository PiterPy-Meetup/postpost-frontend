import { withDocs } from 'storybook-readme';
import { storiesOf } from '@storybook/vue';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action, configureActions } from '@storybook/addon-actions';

import LoginForm from '../components/LoginForm';

storiesOf('LoginForm', module)
  .addDecorator(withKnobs)
  .addDecorator(withDocs(LoginForm.options.__docs))
  .add('Login form', () => {
    return {
      components: {LoginForm},
      props: {
        error: {
          default: text('Authorization error', '')
        },
        loading: {
          default: boolean("Loading flag", false)
        }
      },
      methods: {
        change: action('submit-form-change-action'),
      },
      template: `<login-form
        :error="error"
        :loading="loading"
        @change="change"
      ></login-form>`,
    }
  });
