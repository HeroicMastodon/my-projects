<template>
    <div class="places" v-if="places.length > 0">
        <div class="place" v-for="(place, index) in places" :key="index">
            <router-link :to="removeSpaces('/weather/' + place)" class="link">{{ place }}</router-link>
            
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

@Component({
    name: 'places',
    components: {}
})
export default class Places extends Vue {
    @State('places', { namespace }) places!: Array<string>;

    created() {}

    removeSpaces(value: string): string {
        let temp = value.replace(/\s/g, '\%20');
        
        console.log(encodeURI(value))
        return encodeURI(value);
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
