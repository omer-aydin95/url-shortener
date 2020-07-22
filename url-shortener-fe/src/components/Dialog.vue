<template>
    <div id="dialog">
        <p>{{msg}}</p>
        
        <button @click="closeDialog">Close</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppEvents from "../constants/AppEvents";

export default Vue.extend({
    name: "Dialog",
    methods: {
        closeDialog() {
            this.$emit(AppEvents.CLOSE_DIALOG);
        }
    },
    props: ["msg"]
});
</script>

<style scoped>
#dialog {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
</style>
