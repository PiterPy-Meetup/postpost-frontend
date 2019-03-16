import {storiesOf} from '@storybook/vue';
import {withKnobs, text, select} from '@storybook/addon-knobs';
import {ICONS_BY_SOCIAL_NETWORK} from '../components/PublicationItemPlatformIcon.vue';

import PublicationItemPlatformIcon from '../components/PublicationItemPlatformIcon.vue';
import {withInfo} from "storybook-addon-vue-info";

const SOCIAL_NETWORK_ICONS = Array.from(ICONS_BY_SOCIAL_NETWORK.keys()).concat('invalidKey');

storiesOf('PublicationItemPlatformIcon', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo)
  .add(
    'Just Icon',
    () => {
      const networkIcons = SOCIAL_NETWORK_ICONS.slice();
      return {
        components: { PublicationItemPlatformIcon },
        props: {
          avatar: {
            default: text('avatar', 'https://avatars2.githubusercontent.com/u/19777948?s=460&v=4')
          },
          socialType: {
            default: select('socialType',
              networkIcons,
              networkIcons[0])
          },
        },
        template: `
  <publication-item-platform-icon
    :avatar="avatar" :social-type="socialType"
  ></publication-item-platform-icon>`,
      }
    },
    {
      info: {
        summary: PublicationItemPlatformIcon.options.__docs,
      },
    },
  )
  .add(
    "Icon within card",
    () => {
      return {
        components: { PublicationItemPlatformIcon },
        data: () => {
          return {
            networkIcons: SOCIAL_NETWORK_ICONS.slice(),
          }
        },
        props: {
          avatar: {
            default: text('avatar', 'https://avatars2.githubusercontent.com/u/19777948?s=460&v=4')
          }
        },
        template: `
  <v-layout justify-center>
    <v-flex xs6>
      <v-card>
      <v-layout justify-start row wrap>
        <v-flex xs4 class="px-1 pt-1" v-for="(network, index) in networkIcons">
            <publication-item-platform-icon style="pa-1" :key="index" :avatar="avatar" :social-type="network"></publication-item-platform-icon>
        </v-flex>
      </v-layout>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Some post!</h3>
            <div> Some post' s text. </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>`
      }
    },
    {
      info: {
        summary: PublicationItemPlatformIcon.options.__docs,
      },
    },
  )
  .add(
    'Icon with null "avatar" property',
    () => {
      const networkIcons = SOCIAL_NETWORK_ICONS.slice();
      return {
        components: {PublicationItemPlatformIcon},
        props: {
          socialType: {
            default: select('socialType',
              networkIcons,
              networkIcons[0])
          },
        },
        template: `
  <publication-item-platform-icon
    :avatar="null" :social-type="socialType"
  ></publication-item-platform-icon>`,
      }
    },
    {
      info: {
        summary: PublicationItemPlatformIcon.options.__docs
      }
    }
  );
