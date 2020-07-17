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
}

button {
    width: 100px;
    min-width: 100px;
    margin-left: 10px;
}

.error {
    border: 1px solid red;
    border-radius: 2px;
}

@media (max-width: 650px) {
    form {
        flex-direction: column;
        align-items: center;
    }

    button {
        margin-left: 0;
        margin-top: 10px;
    }
}
</style>
