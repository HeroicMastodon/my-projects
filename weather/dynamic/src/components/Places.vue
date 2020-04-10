<template>
    <div class="places" v-if="places.length > 0">
        <div class="place" v-for="(place, index) in places" :key="index" @click="$emit('selected')">
            <router-link :to="encodeURL('/weather/' + place)" class="link">{{
                camelCase(place) }}
			<template v-if="isDefaultPlace(place)">(<i>default</i>)</template>
            </router-link>
        </div>
    </div>
    <div v-else>
        You have not saved any locations.
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { State, Getter } from 'vuex-class';
import { camelCase } from '../utils/helpers';
import { State as storeState, stateFields } from '@/store/state';
import { getterFields, isDefaultPlace } from '../store/getters';

@Component({
    name: 'places',
	components: {},
	methods: {
		camelCase: camelCase,
		encodeURL: encodeURI,
	}
})
export default class Places extends Vue {
	@State(stateFields.places) places!: Array<string>;
	@Getter(getterFields.isDefaultPlace) isDefaultPlace!: isDefaultPlace;

    created() {
	}

}
</script>
<style lang="scss" scoped>
.places {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    min-width: 320px;
    overflow: hidden;
    word-wrap: normal;

    .place {
        margin: 10px;
        width: 100%;
        text-align: left;
		display: flex;
		width: 100%;

		.link {
			width: 100%;
			text-align: center;
		}

        .router-link-active {
            background-color: black;
        }
    }
}
</style>
