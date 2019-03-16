<template>
  <publication-form
    v-model="posts"
    @submit=""
  ></publication-form>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Prop} from 'vue-property-decorator';
    import DateTimePicker from './DateTimePicker.vue';
    import PublicationFormAttachments from "./PublicationFormAttachments.vue";
    import lodash from 'lodash'


    const postsSchema = {
        text: '',
        scheduledAt: '',
        platformPosts: [],
        attachments: [],
    }

    @Component({
        components: {PublicationFormAttachments, DateTimePicker},
    })
    export default class PublicationController extends Vue {

        private posts = lodash.cloneDeep(postsSchema);

    }
</script>

<style scoped>

</style>
