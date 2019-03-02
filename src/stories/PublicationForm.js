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
          isPublicationFormOpen: false,
        }
      },
      template: `
        <v-layout>
            <v-btn 
                slot="activator"
                @click='isPublicationFormOpen = true'
                >Открыть форму</v-btn>
            </v-btn><publication-form
                @close='isPublicationFormOpen = false'
                :isPublicationFormOpen="isPublicationFormOpen"
            ></publication-form>
        </v-layout>`,
    }
  })
