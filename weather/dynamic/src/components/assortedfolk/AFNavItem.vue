<template>
<div class="nav-item">
    <router-link :to="to" class="link"><slot name="link"></slot></router-link>
    <!-- <div class="nested" v-else-if="isNested"></div>
    <slot v-else-if="isCustom" name="custom"></slot>
    <template v-else>You clearly forgot how this component works</template> -->
</div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';


@Component({
    name: 'navItem',
    components: {}
})
export default class NavItem extends Vue {
    @Prop() to!: string;
    // @Prop() isLink!: boolean;
    // @Prop() isNested!: boolean;
    // @Prop() isCustom!: boolean;
}
</script>
<style lang="scss" scoped>
.nav-item {
    width: 320px;
    overflow: visible;

    .link {
        text-decoration: none;
        background-color: gray;
        color: black;
        font-size: 1em;
        width: 100%;
        
    }
}
</style>