<template>
    <p>{{msg}}</p>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: ["msg"]
});
</script>

<style scoped>
</style>
