<docs>
    Form for creating and publishing post to social networks.
</docs>

<template>
    <v-dialog v-model="isPublicationFormOpen">
        <v-container fluid>
            <v-layout>
                <v-flex xs12>
                    <v-card>
                        <v-card-title>
                            <v-layout row justify-start>
                                <v-flex xs6>
                                    <v-layout row align-center fill-height>
                                        <v-flex xs12>
                                            <v-layout justify-start>
                                                <h2>Новая публикация</h2>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex offset-xs4 xs2>
                                    <v-layout justify-end>
                                        <v-btn text icon>
                                            <v-icon>close</v-icon>
                                        </v-btn>
                                    </v-layout>
                                </v-flex>
                            </v-layout>

                        </v-card-title>

                        <v-divider></v-divider>

                        <v-flex xs12>
                            <v-card-text>

                                <v-layout row wrap justify-center class="ma-3">

                                    <v-flex xs12>
                                        <v-flex xs12>
                                            <v-textarea
                                                    outline
                                                    label="Напишите текст"
                                                    v-model="postText"
                                            ></v-textarea>
                                        </v-flex>

                                    </v-flex>

                                    <v-flex xs12>


                                        <v-select
                                                :value="posts['platformPosts'].map(el => el.platformType)"
                                                @input="onSelectNetwork"
                                                :items="socialItems"
                                                label="Социальные сети"
                                                multiple
                                        ></v-select>

                                    </v-flex>

                                    <v-divider></v-divider>

                                    <v-layout row wrap>
                                        <v-flex v-for="(network, index) in posts['platformPosts']" :key="index" xs12>
                                            <v-textarea
                                                    outline
                                                    :label="`Напишите текст для ${network.platformType}` "
                                                    v-model="network.text"
                                            ></v-textarea>
                                        </v-flex>
                                    </v-layout>

                                </v-layout>

                            </v-card-text>
                        </v-flex>

                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-dialog>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Prop} from 'vue-property-decorator';
    import axios from 'axios';
    import moment from 'moment';

    @Component
    export default class PublicationForm extends Vue {

        @Prop(
            {
                type: Boolean,
                default: false,
            }
        )
        public isPublicationFormOpen!: boolean;

        private publicationTypes: Array<{ 'text': string, 'value': string }> = [
            {text: 'Черновик', value: 'draft'},
            {text: 'Запланированная', value: 'scheduled'},
        ];

        private socialMediaList: Array<{ 'text': string, 'value': string }> = [
            {text: 'Telegram', value: 'telegram'},
            {text: 'Facebook', value: 'facebook'},
            {text: 'VK', value: 'vk'},
        ];

        private socialMapping: ReadonlyMap<string, string> = new Map([
            ['Telegram', 'telegram'],
            ['Facebook', 'facebook'],
            ['VK', 'vk'],
        ]) as ReadonlyMap<string, string>;

        get socialItems(): Array<string> {
            return this.socialMediaList.map(social => social.text)
        }

        /*
        *  Array<{
                'platformType': "telegram_channel",
                'text': string,
                'telegramPictureAsLink': true,
                'telegramMarkdown': true
            }> */

        private postText: string = '';

        private posts1: Map<string, string> = new Map([
            ['text', ''],
            ['picture', ''],
            ['scheduledAt', ''],
            ['platformPosts', []],
            ["createdAt", ''],
            ["updatedAt", '']
        ]);

        private posts: object = {
            text: '',
            picture: '',
            scheduledAt: '',
            platformPosts: [],
            createdAt: '',
            updatedAt: ''
        };

        private onSelectNetwork(value): void {
            const oldPosts = this.posts['platformPosts'].slice().filter(el => value.includes(el.platformType));
            this.posts['platformPosts'] = oldPosts.concat(value
                .filter(el => !oldPosts.map(el => el.platformType).includes(el))
                .map(el => {
                    return {
                        platformType: el,
                        text: this.postText,
                        telegramPictureAsLink: false,
                        telegramMarkdown: false,
                    }
                }))
        }

        private chosenSocials: Array<string> = [];

        private formData = {
            date: new Date().toISOString().substr(0, 10),
            time: new Date().toLocaleTimeString(),
            text: '',
            type: null,
        };

        private async postPublication(): Promise<void> {
            // const result = await axios.post(`{BACKEND_URL}/api/publications`);

            const payload = this.transformFormDataToPayload();

            try {
                const result = await axios.post(
                    `https://opes.serveo.net/api/publications/`,
                    payload,
                    {headers: {authorization: 'Bearer 9Q2DBXAUju3PpL7R18vdXbs6KQ1AJ6'}},
                );
            } catch (e) {
                // pass
            }
        }

        private

        transformFormDataToPayload(): any {  // TODO declare formdata and payload interfaces
            const data = this.formData;

            return {
                text: data.text,
                scheduledAt: moment(`${data.date} ${data.time}`).format(),
                platformPosts: [
                    {
                        platformType: 'telegram_channel',
                    },
                ],
            };
        }
    }
</script>
