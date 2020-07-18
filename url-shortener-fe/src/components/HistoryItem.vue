<template>
    <div id="history-item">
        <div>
            <a v-bind:href="shortenedUrl.getRealUrl()" target="_blank">{{shortenedUrl.getRealUrl()}}</a>
        </div>

        <div>
            <a v-bind:href="shortenedUrl.getShortenedUrl()" target="_blank">{{shortenedUrl.getShortenedUrl()}}</a>
        </div>

        <div>{{new Date(shortenedUrl.getExpireDate()).toLocaleString()}}</div>

        <div>
            <button @click="deleteHistoryItem">Delete</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppEvents from "../constants/AppEvents";

export default Vue.extend({
    name: "HistoryItem",
    props: ["shortenedUrl"],
    methods: {
        deleteHistoryItem() {
            this.$emit(AppEvents.DELETE_HISTORY_ITEM, this.shortenedUrl);
        }
    }
});
</script>

<style scoped>
#history-item {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 0.5fr;
    gap: 10px;
}

#history-item > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

#history-item > div:last-child {
    text-align: end;
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
}

button {
    width: 100px;
    min-width: 100px;
}

@media (max-width: 650px) {
    #history-item {
        grid-template-columns: 1fr;
        gap: 10px;
    }

    #history-item > div:last-child {
        text-align: start;
    }
}
</style>
