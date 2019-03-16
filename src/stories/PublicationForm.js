import {withDocs} from 'storybook-readme';
import {storiesOf} from '@storybook/vue';
import {boolean, text, withKnobs} from '@storybook/addon-knobs';

import PublicationForm from '../components/PublicationForm.vue';

storiesOf('PublicationForm', module)
  .addDecorator(withKnobs)
  .addDecorator(withDocs(PublicationForm.options.__docs))
  .add('Publication form sample', () => {
    return {
      components: {PublicationForm},
      props: {
        error: {
          default: text('Authorization error', '')
        },
        loading: {
          default: boolean("Loading flag", false)
        },
        success: {
          default: boolean("Success flag", false)
        },
      },
      data: () => {
        return {
          publication: {
            text: '',
            scheduledAt: '',
            platformPosts: [],
            attachments: [],
          }
        }
      },
      methods: {
        create: function () {
          console.log(this.publication);
        }
      },
      template: `
        <v-layout row wrap justify-center>
          <v-flex xs6>
            <publication-form
                v-model="publication"
                :loading="loading"
                :error="error"
                :success="success"
                @create="create"
            ></publication-form>
          </v-flex>
        </v-layout>`,
    }
  })
