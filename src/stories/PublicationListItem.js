import { storiesOf } from '@storybook/vue';
import { withKnobs, text } from '@storybook/addon-knobs';

import PublicationListItem from '../components/PublicationListItem.vue';
import { withInfo } from "storybook-addon-vue-info";

storiesOf('PublicationListItem', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo)
  .add(
    'Simple item',
    () => {
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
    },
    {
      info: {
        summary: PublicationListItem.options.__docs
      }
    }
  );
