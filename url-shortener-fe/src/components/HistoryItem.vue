<template>
    <div id="history-item" v-bind:class="{'dark-bg':(index % 2 == 0)}">
        <div>
            <a v-bind:title="`Real Url: ${shortenedUrl.getRealUrl()}`" v-bind:href="shortenedUrl.getRealUrl()" target="_blank">{{shortenedUrl.getRealUrl()}}</a>
        </div>

        <div>
            <a v-bind:title="`Short Url: ${shortenedUrl.getShortenedUrl()}`" v-bind:href="shortenedUrl.getShortenedUrl()" target="_blank">{{shortenedUrl.getShortenedUrl()}}</a>
        </div>

        <div class="underline" v-bind:title="`Expires on ${new Date(shortenedUrl.getExpireDate()).toLocaleString()}`">{{`Exp: ${new Date(shortenedUrl.getExpireDate()).toLocaleString()}`}}</div>

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
    props: ["shortenedUrl", "index"],
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
    min-height: 50px;
    align-items: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 0.5fr;
    gap: 10px;
    padding: 0 10px 0 10px;
    box-sizing: border-box;
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
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 15px;
    border-radius: 50px;
    border: 1px solid black;
    outline: none;
    background-color: white;
}

button:hover {
    background-color: rgb(225, 225, 225);
    cursor: pointer;
}

button:active {
    background-color: rgb(205, 205, 205);
}

.dark-bg {
    background-color: rgb(205, 205, 205);
}

.underline {
    text-decoration: underline dotted;
}

.underline:hover {
    cursor: help;
}

@media (max-width: 650px) {
    #history-item {
        grid-template-columns: 1fr;
        gap: 10px;
        padding: 10px 10px 10px 10px;
    }

    #history-item > div:last-child {
        text-align: start;
    }
}
</style>
