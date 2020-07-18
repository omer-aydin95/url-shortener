<template>
	<div id="app">
		<h1>URL Shortener</h1>

		<Form v-on:FORM_SUBMIT_SUCCESS="formSubmitSuccess" v-on:OPEN_DIALOG="openDialog" />

		<History v-on:DELETE_HISTORY_ITEM="deleteHistoryItem" v-bind:shortenedUrls="shortenedUrls" />

		<Dialog v-if="isDialogOpened" v-on:CLOSE_DIALOG="closeDialog" v-bind:msg="dialogMsg" />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Form from "./components/Form.vue";
import History from "./components/History.vue";
import ShortenedUrl from "./models/ShortenedUrl";
import Dialog from "./components/Dialog.vue";
import UrlShortenerApi from "./apis/UrlShortenerApi";
import RequestResults from "./constants/RequestResults";

export default Vue.extend({
	name: "App",
	components: {
		Form,
		History,
		Dialog
	},
	methods: {
		formSubmitSuccess(shortenedUrl: ShortenedUrl) {
			this.shortenedUrls.filter(e => e.getId() == shortenedUrl.getId()).length == 0 && this.shortenedUrls.push(shortenedUrl);
		},

		deleteHistoryItem(shortenedUrl: ShortenedUrl) {
			this.urlShortenerApi.deleteShortUrl(shortenedUrl.getId(), (requestResult: RequestResults) => {
				if(requestResult == RequestResults.SUCCESS) {
					this.shortenedUrls = this.shortenedUrls.filter(e => e.getId() != shortenedUrl.getId());
				} else {
					this.openDialog("Someting went wrong!");
				}
			});
		},

		closeDialog() {
			this.isDialogOpened = false;
		},

		openDialog(msg: string) {
			this.dialogMsg = msg;
			this.isDialogOpened = true;
		}
	},
	data() {
		return {
			shortenedUrls: Array<ShortenedUrl>(),
			isDialogOpened: false,
			dialogMsg: "",
			urlShortenerApi: new UrlShortenerApi()
		};
	},
	created() {
		this.urlShortenerApi.getAllShortenedUrls(
			(shortenedUrls: Array<ShortenedUrl>) => {
				this.shortenedUrls = shortenedUrls;
			}
		);
	}
});
</script>

<style scoped>
h1{
	width: 100%;
	text-align: center;
}
#app {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-left: 3%;
	margin-right: 3%;
}
</style>
