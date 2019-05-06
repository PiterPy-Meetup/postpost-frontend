<template>
  <v-layout row wrap justify-start>
    <v-flex xs12>
      <v-layout
        v-if="value.length > 0"
        class="mx-2"
        row
        wrap
        style="border: 1px solid lightgray;"
      >
        <v-flex
          v-for="(attachment, index) in value.map(el => el.attachment)"
          :key="index"
          xs2
        >
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              class="ma-1"
              color="grey lighten-4"
            >
              <v-img class="ma-1" :style="loading ? 'cursor: default;' : 'cursor: pointer;'" :src="attachment"
                     @click="deleteImage(index)">
                <v-expand-transition>
                  <div
                    v-if="hover && !loading"
                    class="d-flex transition-fast-in-fast-out blue darken-2 v-card--reveal black--text"
                    style="height: 100%;"
                  >
                    X
                  </div>
                </v-expand-transition>
              </v-img>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12
    >
      <uploadcare
        style="text-align: start;"
        :imageOnly="false"
        :clearable="true"
        v-if="value.length < 1"
        :multiple="false"
        :public-key="publicKey"
        @success="onUploadSuccess"
      >
        <div
          @click="disableIfLoading"
        >
          <v-btn
            color="primary"
            outline
            :disabled="loading"
          >
            Attachment
          </v-btn>
        </div>
      </uploadcare>
    </v-flex>
  </v-layout>

</template>

<script lang="ts">

    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Prop} from 'vue-property-decorator';
    import DateTimePicker from "./DateTimePicker.vue";
    import Uploadcare from 'uploadcare-vue';

    @Component({
        components: {Uploadcare, DateTimePicker},
    })
    export default class PublicationForm extends Vue {

        @Prop(
            {
                type: Array,
                default: () => [],
            },
        )
        public value: object[];

        @Prop(
            {
                type: Boolean,
                default: false,
            },
        )
        public loading!: boolean;

        private deleteImage(index: number): void {
            if (this.loading) {
                return;
            }
            const newAttachments = this.value.slice();
            newAttachments.splice(index, 1);
            this.$emit('input', newAttachments);
        }

        private onUploadSuccess(uploadData: Map<string, any>) {
            const newAttachments = this.value.slice();
            newAttachments.push({attachment: uploadData.cdnUrl})
            this.$emit('input', newAttachments);
        }

        private get publicKey(): string {
            return process.env.UPLOAD_CARE_PUBLIC_KEY;
        }

        private disableIfLoading(event): void {
            if (this.loading) {
                event.stopPropagation()
            }
        }

    }
</script>

<style scoped>


  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .8;
    position: absolute;
    width: 100%;
  }

</style>
