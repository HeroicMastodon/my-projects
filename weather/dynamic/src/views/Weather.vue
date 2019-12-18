<template>
    <div class="weather">
        <weather-card/>
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue, Prop } from 'vue-property-decorator';
import WeatherCard from '@/components/WeatherCard.vue';

@Component({
    name: 'weather',
    components: {
        WeatherCard
    }
})
export default class Weather extends Vue {
    @Prop() private msg!: String;

    
}
</script>

<style lang="scss" scoped>

</style>
