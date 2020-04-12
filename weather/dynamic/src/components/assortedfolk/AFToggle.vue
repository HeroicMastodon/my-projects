<template>
    <div :class="'toggle ' + activeClass">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    props: {
        activeClass: String
    }
    // data() {
    //     return {
    //         activeClass: ''
    //     };
    // },

    // methods: {
    //     activate() {
    //         if (this.activeClass == '') {
    //             this.activeClass = 'active';
    //         } else {
    //             this.activeClass = '';
    //         }

    //         this.$emit('toggle');
    //     }
    // }
});
</script>

<style lang="scss" scoped>
@import '../../scss/__stuff.scss';

.toggle {
    margin: 20px 10px;
    transition: 0.5s;
    width: 40px;

    .line {
        width: 40px;
        height: 4px;
		background: $darkBlueText;
		background-color: $darkBlueText;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        transition: 0.5s;
        margin-bottom: 5px;
        border-radius: 4px;
    }

    &.active {
        transform: rotate(180deg);

        .line {
            width: 39px;

            &:first-child {
                transform: rotate(35deg) translate(15px, -7px);
                width: 25px;
            }

            &:last-child {
                transform: rotate(-35deg) translate(15px, 7px);
                width: 25px;
            }
        }
    }
}
</style>
