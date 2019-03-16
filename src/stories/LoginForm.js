import { storiesOf } from '@storybook/vue';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withInfo } from "storybook-addon-vue-info";

import LoginForm from '../components/LoginForm';

storiesOf('LoginForm', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo)
  .add(
    'Login form',
    () => {
      console.log(LoginForm.options)
      return {
        components: { LoginForm },
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
    },
    {
      info: {
        summary: LoginForm.options.__docs,
      },
    },
  )
  .add(
    'Login form with handler',
    () => {
      return {
        components: { LoginForm },
        data() {
          return {
            error: null,
            loading: false,
          }
        },
        methods: {
          change(username, password) {
            this.loading = true;
            this.error = null;
            setTimeout(() => {
              if (username !== 'admin' || password !== 'admin') {
                this.error = 'Invalid credentials!'
              }
              this.loading = false;
            }, 800);

          }
        },
        template: `<login-form
          :error="error"
          :loading="loading"
          @change="change"
        ></login-form>`,
      }
    },
    {
      info: {
        summary: "Use `admin/admin` as right credentials. See story source code for more info.",
      },
    },
  );
