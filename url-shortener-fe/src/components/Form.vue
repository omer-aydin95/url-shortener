<template>
    <form @submit="onFormSubmit">
        <input v-bind:disabled="diableInput" type="text" placeholder="Enter a url..." v-model="urlInput" v-bind:class="{'error':invalidUrlInput}">
        
        <button v-bind:disabled="disableButton" type="submit">Short</button>
    </form>
</template>

<script lang="ts">
import Vue from "vue";
import AppEvents from "../constants/AppEvents";
import ShortenedUrl from "../models/ShortenedUrl";
import UrlShortenerApi from "../apis/UrlShortenerApi";

export default Vue.extend({
    name: "Form",
    methods: {
        onFormSubmit(event: Event) {
            event.preventDefault();

            const pattern = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/i;

            if(pattern.test(this.urlInput)) {
                this.invalidUrlInput = false;
                this.diableInput = true;
                this.disableButton = true;
                
                const urlShortenerApi: UrlShortenerApi = new UrlShortenerApi();
                urlShortenerApi.shortUrl(this.urlInput, (shortenedUrl: ShortenedUrl) => {
                    if(shortenedUrl != null) {
                        this.$emit(AppEvents.FORM_SUBMIT_SUCCESS, shortenedUrl);
                    } else {
                        this.$emit(AppEvents.OPEN_DIALOG, "Something went wrong!");
                    }

                    this.urlInput = "";
                    this.diableInput = false;
                    this.disableButton = false;
                });
            } else {
                this.invalidUrlInput = true;
            }
        }
    },
    data() {
        return {
            urlInput: "",
            invalidUrlInput: false,
            diableInput: false,
            disableButton: false
        };
    }
});
</script>

<style scoped>
form {
    width: 100%;
    display: flex;
    justify-content: center;
}

input {
    width: 100%;
    outline: none;
    height: 30px;
    font-family: 'Roboto Condensed', sans-serif;
    border-radius: 50px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 15px;
    border: 1px solid black;
}

button {
    width: 100px;
    min-width: 100px;
    margin-left: 10px;
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

.error {
    border: 1px solid red;
    border-radius: 50px;
}

@media (max-width: 650px) {
    form {
        flex-direction: column;
        align-items: center;
    }

    button {
        margin-left: 0;
        margin-top: 10px;
        height: 34px;
    }
}
</style>
