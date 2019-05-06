<template>
  <div id=app>
    <v-app>
      <publication-form
        v-model="publication"
        :loading="loading"
        :error="error"
        :success="success"
        @create="newPublication"
      ></publication-form>
    </v-app>
  </div>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';
    import PublicationForm from '@/components/PublicationForm.vue';
    import lodash from 'lodash';
    import { createNewPublication } from '@/api';

    const publicationSchema = {
        text: '',
        scheduledAt: '',
        platformPosts: [],
        attachments: [],
    };

    @Component({
        components: {
            PublicationForm,
        },
    })
    export default class NewPublication extends Vue {

        private publication: object = lodash.cloneDeep(publicationSchema);

        private loading: boolean = false;

        private success: boolean = false;

        private error: string | null = null;

        private async newPublication() {
            this.loading = true;
            this.error = null;
            try {
                await createNewPublication(this.publication);
                this.success = true;
                this.publication = lodash.cloneDeep(publicationSchema);
                setTimeout(() => {
                    this.success = false;
                }, 1000);
            } catch (error) {
                this.error = error.response.data.error_description;
            }
            this.loading = false;
        }

    }
</script>
