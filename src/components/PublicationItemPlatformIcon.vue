<docs>
    Icon with social networks.
    This component allow to display 5 social networks - instagram, facebook, vk, twitter, telegram.
    This component takes in link to profile image (image property).
</docs>

<template>
    <div class="avatar-container">
        <img class="outer-icon" :src="avatarIcon" alt="avatar"/>
        <img class="inner-icon" :src="socialNetworkIcon" alt="social-avatar"/>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Prop, Component} from 'vue-property-decorator';
    import twitterAvatar from '../assets/social_logos/twitter.svg';
    import facebookAvatar from '../assets/social_logos/facebook.svg';
    import vkAvatar from '../assets/social_logos/vk.svg';
    import instagramAvatar from '../assets/social_logos/instagram.svg';
    import telegramAvatar from '../assets/social_logos/telegram.svg';
    import unknownNetwork from '../assets/social_logos/unknown-network.svg';
    import unknownAvatar from '../assets/social_logos/unknown-avatar.svg';

    export const ICONS_BY_SOCIAL_NETWORK: ReadonlyMap<string, string> = new Map([
        ['twitter', twitterAvatar],
        ['facebook', facebookAvatar],
        ['vk', vkAvatar],
        ['instagram', instagramAvatar],
        ['telegram', telegramAvatar],
    ]) as ReadonlyMap<string, string>;

    @Component
    export default class PublicationItemPlatformIcon extends Vue {

        @Prop({type: String})
        public avatar?: string;

        @Prop({
            type: String,
            validator: (value) => {
                return ICONS_BY_SOCIAL_NETWORK.has(value);
            },
        })
        public socialType!: string;

        get socialNetworkIcon(): string {
            return ICONS_BY_SOCIAL_NETWORK.get(this.socialType) || unknownNetwork;
        }

        get avatarIcon(): string {
            return this.avatar || unknownAvatar;
        }


    }
</script>

<style scoped>

    .avatar-container {
        width: 100%;
        height: 100%;
        display: inline-block;
        position: relative;
    }

    .outer-icon {
        width: 100%;
        height: 100%;
        display: block;
        position: relative;
        z-index: 1;
        border: 1px solid #EDEDED;
        border-radius: 50%;
    }

    .inner-icon {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        z-index: 2;
        bottom: 0;
        right: 0;
        transform-origin: bottom right;
        transform: scale(0.4);
        border-radius: 50%;
        padding: 6%;
        background: #FFFFFF;
    }

</style>
