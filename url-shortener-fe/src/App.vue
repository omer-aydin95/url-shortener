<template>
	<div id="app">
		<h1>URL Shortener</h1>

		<Form v-on:FORM_SUBMIT_SUCCESS="formSubmitSuccess" v-on:OPEN_DIALOG="openDialog" />

		<History v-on:DELETE_HISTORY_ITEM="deleteHistoryItem" v-bind:shortenedUrls="shortenedUrls" />

		<InfoMessage v-if="showInfoMsg" v-bind:msg="infoMsg" />

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
import InfoMessage from "./components/InfoMessage.vue";

export default Vue.extend({
	name: "App",
	components: {
		Form,
		History,
		Dialog,
		InfoMessage
	},
	methods: {
		formSubmitSuccess(shortenedUrl: ShortenedUrl) {
			this.shortenedUrls.filter(e => e.getId() == shortenedUrl.getId()).length == 0 && this.shortenedUrls.push(shortenedUrl);

			this.showInfoMsg = false;
		},

		deleteHistoryItem(shortenedUrl: ShortenedUrl) {
			this.urlShortenerApi.deleteShortUrl(shortenedUrl.getId(), (requestResult: RequestResults) => {
				if(requestResult == RequestResults.SUCCESS) {
					this.shortenedUrls = this.shortenedUrls.filter(e => e.getId() != shortenedUrl.getId());

					if(this.shortenedUrls.length == 0) {
						this.infoMsg = "There are not any shortened urls...";
						this.showInfoMsg = true;
					}
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
			urlShortenerApi: new UrlShortenerApi(),
			infoMsg: "Please wait...",
			showInfoMsg: true
		};
	},
	created() {
		this.urlShortenerApi.getAllShortenedUrls(
			(shortenedUrls: Array<ShortenedUrl>) => {
				if(shortenedUrls == null) {
					this.dialogMsg = "Something went wrong!";
					this.isDialogOpened = true;
					this.infoMsg = "There are not any shortened urls...";
				} else {
					if(shortenedUrls.length > 0) {
						this.showInfoMsg = false;
					} else {
						this.infoMsg = "There are not any shortened urls...";
					}

					this.shortenedUrls = shortenedUrls;
				}
			}
		);
	}
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');

h1{
	width: 100%;
	text-align: center;
	font-size: 50px;
}

#app {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-left: 3%;
	margin-right: 3%;
	font-family: 'Roboto Condensed', sans-serif;
	margin-bottom: 25px;
}

@media (max-width: 350px) {
	h1 {
		font-size: 40px;
	}
}
</style>
