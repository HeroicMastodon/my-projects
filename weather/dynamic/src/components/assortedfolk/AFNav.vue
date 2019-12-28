<template>
    <div class="bar">
        <div class="brand">
            <router-link :to="brandLink">
                <slot name="brandContent"></slot>
            </router-link>
        </div>
        <div class="bar-items">
            <nav-item to="/">
                <template v-slot:link>
                    Some Link
                </template>
            </nav-item>
            <nav-item to="/">
                <template v-slot:link>
                    Some Link
                </template>
            </nav-item>
            <nav-item to="/">
                <template v-slot:link>
                    Some Link
                </template>
            </nav-item>
            <nav-item to="/">
                <template v-slot:link>
                    Some Link
                </template>
            </nav-item>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import NavItem from './AFNavItem.vue';

@Component({
    name: 'navBar',
    components: {
        NavItem
    }
})
export default class NavBar extends Vue {
    brandLink = '/';
}
</script>
<style lang="scss" scoped>
.bar {
    display: flex;
    background-color: rgb(160, 173, 184);
    height: 5vh;

    .brand {
    }

    .bar-items {
        display: flex;
        justify-content: space-evenly;
    }
}
</style>
