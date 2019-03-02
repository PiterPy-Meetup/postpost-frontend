<docs>
    Form for creating and publishing post to social networks.
</docs>

<template>
    <v-dialog persistent scrollable v-model="isPublicationFormOpen" max-width width="600" class="scroll-style">
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
                                    <v-btn
                                            text
                                            icon
                                            @click="$emit('close')"
                                    >
                                        <v-icon>close</v-icon>
                                    </v-btn>
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

                                <v-flex xs12>

                                    <v-layout row wrap>
                                        <v-flex
                                                v-for="(network, index) in posts['platformPosts']"
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
                                                        v-if="posts['platformPosts'].length > 1 && index < posts['platformPosts'].length - 1"
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
                                            v-model="posts['scheduledAt']"
                                    >
                                    </date-time-picker>

                                </v-flex>

                            </v-flex>

                        </v-layout>

                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-list-tile>
                            <v-layout
                                    align-center
                                    justify-end
                            >
                                <v-btn
                                        color="primary"
                                        outline
                                >
                                    В черновики
                                </v-btn>
                                <v-btn
                                        color="primary"
                                        outline
                                >
                                    Запланировать
                                </v-btn>
                            </v-layout>
                        </v-list-tile>
                    </v-card-actions>
                </v-card>

            </v-flex>
        </v-layout>
    </v-dialog>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Prop} from 'vue-property-decorator';
    import DateTimePicker from './DateTimePicker.vue';

    @Component({
        components: {DateTimePicker},
    })
    export default class PublicationForm extends Vue {

        @Prop(
            {
                type: Boolean,
                default: false,
            },
        )
        public isPublicationFormOpen!: boolean;

        private menu!: boolean = false;

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

        get socialItems(): string[] {
            return this.socialMediaList.map((social) => social.text);
        }

        private postText: string = '';

        private chosenSocials: string[] = [];

        private posts: object = {
            text: '',
            picture: '',
            scheduledAt: '',
            platformPosts: [],
        };

        private onSelectNetwork(value): void {
            const oldPosts = this.posts.platformPosts.slice().filter((el) => value.includes(el.platformType));
            this.posts.platformPosts = oldPosts.concat(value
                .filter((np) => !oldPosts.map((op) => op.platformType).includes(np))
                .map((np) => {
                    return {
                        platformType: np,
                        text: this.postText,
                        telegramPictureAsLink: false,
                        telegramMarkdown: false,
                    };
                }));
        }
    }
</script>

<style scoped>

    /* SCROLL */

    /* width */
    /* width */
    ::-webkit-scrollbar {
        width: 20px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: red;
        border-radius: 10px;
    }

</style>
