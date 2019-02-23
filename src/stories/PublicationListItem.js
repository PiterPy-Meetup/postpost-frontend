
import { withReadme, withDocs, doc } from 'storybook-readme';
import { storiesOf } from '@storybook/vue';
import { object, withKnobs, number, text } from '@storybook/addon-knobs';

import PublicationListItem from '../components/PublicationListItem.vue';
storiesOf('PublicationListItem', module)

  .addDecorator(withKnobs)
  .add('Simple item', () => {
    return {
      components: { PublicationListItem },  
      props: {
        text: {
          default: text('text', 'publication text') 
        }
      },
      template: `<publication-list-item
        :text="text"
      ></publication-list-item>`,
    }
  });