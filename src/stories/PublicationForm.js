import {withDocs} from 'storybook-readme';
import {storiesOf} from '@storybook/vue';
import {withKnobs} from '@storybook/addon-knobs';

import PublicationForm from '../components/PublicationForm.vue';

storiesOf('PublicationForm', module)
  .addDecorator(withKnobs)
  .addDecorator(withDocs(PublicationForm.options.__docs))
  .add('Publication form sample', () => {
    return {
      components: {PublicationForm},
      props: {},
      data: () => {
        return {
          posts: {
            text: '',
            scheduledAt: '',
            platformPosts: [],
            attachments: [],
          }
        }
      },
      methods: {
        submit: function () {
          console.log(this.posts);
        }
      },
      template: `
        <v-layout row wrap justify-center>
          <v-flex xs6>
            <publication-form
                v-model="posts"
                @submit="submit"
            ></publication-form>
          </v-flex>
        </v-layout>`,
    }
  })
