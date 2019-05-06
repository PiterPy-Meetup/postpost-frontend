<docs>
  Form for creating and publishing post to social networks.
</docs>

<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <v-layout row justify-start>
              <v-flex xs12>
                <v-layout row align-center fill-height>
                  <v-flex xs12>
                    <v-layout justify-start>
                      <h2 class="pl-2">Новая публикация</h2>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>

          </v-card-title>

          <v-divider></v-divider>

          <v-card-text>

            <v-layout row wrap justify-center class="mx-2">
              <v-flex xs12>

                <v-flex xs12>
                  <v-flex xs12>
                    <v-textarea
                      outline
                      label="Напишите текст"
                      v-model="value.text"
                    ></v-textarea>
                  </v-flex>

                </v-flex>

                <v-flex xs12>

                  <v-select
                    :value="value['platformPosts'].map(el => el.platformType)"
                    @input="onSelectNetwork"
                    :items="socialItems"
                    label="Социальные сети"
                    multiple
                  ></v-select>

                </v-flex>

                <v-flex xs12>

                  <v-layout row wrap>
                    <v-flex
                      v-for="(network, index) in value['platformPosts']"
                      :key="index"
                      xs12
                    >
                      <v-layout row wrap>
                        <v-flex xs12>
                          <v-textarea
                            outline
                            :label="`Напишите текст для ${network.platformType}` "
                            v-model="network.text"
                          ></v-textarea>
                        </v-flex>
                        <v-flex
                          v-if="value['platformPosts'].length > 1 && index < value['platformPosts'].length - 1"
                          xs12
                          class="mb-4"
                        >
                          <v-divider></v-divider>
                        </v-flex>

                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex xs12>

                  <date-time-picker
                    v-model="value['scheduledAt']"
                  >
                  </date-time-picker>

                </v-flex>

              </v-flex>

            </v-layout>

            <v-layout row wrap>

              <v-flex xs12>
                <publication-form-attachments
                  v-model="value.attachments"
                  :loading="loading"
                ></publication-form-attachments>
              </v-flex>

            </v-layout>

            <v-layout row wrap v-if="error" class="mx-2">
              <v-flex xs12>
                <v-alert
                  type="error"
                  :value="error"
                  :outline="true"
                >
                  {{ error }}
                </v-alert>
              </v-flex>
            </v-layout>

            <v-layout row wrap v-if="!error && success" class="mx-2">
              <v-flex xs12>
                <v-alert
                  type="success"
                  :value="success"
                  transition="slide-x-transition"
                  :outline="true"
                >
                  Публикация успешно создана
                </v-alert>
              </v-flex>
            </v-layout>

          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-layout
              class="mx-3"
              align-center
              justify-end
            >
              <v-btn
                color="primary"
                outline
                @click="$emit('create')"
                :loading="loading"
              >
                Запланировать
              </v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Prop } from 'vue-property-decorator';
    import DateTimePicker from './DateTimePicker.vue';
    import PublicationFormAttachments from './PublicationFormAttachments.vue';
    import lodash from 'lodash';

    @Component({
        components: {PublicationFormAttachments, DateTimePicker},
    })
    export default class PublicationForm extends Vue {

        @Prop(
            {
                type: Object,
                default: () => {
                    return {};
                },
            },
        )
        public value!: object;

        @Prop(
            {
                type: Boolean,
                default: false,
            },
        )
        public success!: boolean;


        @Prop(
            {
                type: String,
                default: null,
            },
        )
        public error!: string | null;

        @Prop(
            {
                type: Boolean,
                default: false,
            },
        )
        public loading!: boolean;

        private socialMediaList: Array<{ 'text': string, 'value': string }> = [
            {text: 'Telegram', value: 'telegram'},
            {text: 'Facebook', value: 'facebook'},
            {text: 'VK', value: 'vk'},
        ];

        get socialItems(): string[] {
            return this.socialMediaList.map((social) => social.text);
        }

        private onSelectNetwork(value: string[]): void {
            const posts = lodash.cloneDeep(this.value);
            const oldPosts = posts.platformPosts.slice().filter((el) => value.includes(el.platformType));
            const newPosts = value.filter((np) => !oldPosts.map((op) => op.platformType).includes(np)).map((np) => {
                return {
                    platformType: np,
                    text: posts.text,
                    telegramPictureAsLink: false,
                    telegramMarkdown: false,
                };
            });
            posts.platformPosts = oldPosts.concat(newPosts);
            this.$emit('input', posts);
        }

    }
</script>

<style scoped>

</style>
