<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <div class="headline">Пост №{{publicationJson}}</div>
            </div>
        </v-card-title>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Prop from 'vue-property-decorator';

interface PlatformPost {
    id: number;
    platformType: string;
    text?: string;
    currentStatus: string;
    vkClearMarkdown?: boolean;
    telegramPictureAsLink?: boolean;
    telegramMarkdown?: boolean;
    publication: number;
}

interface Publication {
    id: number;
    text: string;
    currentStatus: string;
    picture?: string;
    scheduledAt?: string;
    platformPosts: PlatformPost[];
    createdAt: string;
    updatedAt: string;
}

@Component
export default class Post extends Vue {
    @Prop(Object)
    publicationJson!: Publication;
}
</script>