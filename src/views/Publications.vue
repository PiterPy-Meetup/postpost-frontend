<template>
    <publication-list></publication-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import PublicationList from '@/components/PublicationList.vue'

@Component({
    components: {
        PublicationList
    }
})
export default class Publications extends Vue {

}
</script>
