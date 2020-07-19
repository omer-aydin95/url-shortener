<template>
    <div>
        <h2>History</h2>

        <template v-for="(shortenedUrl, index) in shortenedUrls">
            <HistoryItem v-on:DELETE_HISTORY_ITEM="deleteHistoryItem" v-bind:key="shortenedUrl.getId()" v-bind:shortenedUrl="shortenedUrl" v-bind:index="index" />
        </template>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import HistoryItem from "./HistoryItem.vue";
import ShortenedUrl from "../models/ShortenedUrl";
import AppEvents from "../constants/AppEvents";

export default Vue.extend({
    name: "History",
    components: {
        HistoryItem
    },
    props: ["shortenedUrls"],
    methods: {
        deleteHistoryItem(shortenedUrl: ShortenedUrl) {
            this.$emit(AppEvents.DELETE_HISTORY_ITEM, shortenedUrl);
        }
    }
});
</script>

<style scoped>
div {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
}

h2 {
    width: 100%;
    margin-top: 30px;
}
</style>
