<template>
    <div class="places" v-if="places.length > 0">
        <div class="place" v-for="(place, index) in places" :key="index">
            <router-link :to="encodeURL('/weather/' + place)" class="link">{{ camelCase(place) }}</router-link>
        </div>
    </div>
    <div v-else>
        You have not saved any locations.
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { namespace } from '@/store/user';
import { camelCase } from '../utils/helpers';

@Component({
    name: 'places',
    components: {}
})
export default class Places extends Vue {
    @State('places', { namespace }) places!: Array<string>;

    created() {}

    encodeURL(value: string): string {
        return encodeURI(value);
    }

    camelCase = (value: string) => {
        return camelCase(value);
    }
}
</script>
<style lang="scss" scoped>
.places {
    display: flex;
    justify-content: flex-start;

    .place {
        margin: 10px;
    }
}
</style>
