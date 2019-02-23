
import { withReadme, withDocs, doc } from 'storybook-readme';
import { storiesOf } from '@storybook/vue';
import { object, withKnobs, number, text } from '@storybook/addon-knobs';

import PButton from '../components/PButton.vue';
storiesOf('PButton', module)

  .addDecorator(withKnobs)
  .add('Just Button', () => {
    return {
      components: { PButton },  
      template: `<p-button
      ></p-button>`,
    }
  });