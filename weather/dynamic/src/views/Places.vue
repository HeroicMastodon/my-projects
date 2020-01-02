<template>
<div class="places">
</div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';


@Component({
    name: 'places',
    components: {}
})
export default class Places extends Vue {}
</script>
<style lang="scss" scoped>
.places {}
</style>