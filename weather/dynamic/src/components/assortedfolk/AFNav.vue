<template>
    <div class="nav-wrap">
        <div class="bar">
            <div class="brand">
                <slot name="brandContent"></slot>
            </div>
            <div class="bar-items">
                <slot name="bars"></slot>
            </div>
        </div>
        <div class="side">
            <div :class="'side-bar ' + activeClass">
                <slot name="side"></slot>
            </div>
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

    @Prop() activeClass = '';

    // activate() {
    //     if (this.activeClass == '') {
    //         this.activeClass = 'active';
    //     } else {
    //         this.activeClass = '';
            
    //     }
    // }
}
</script>
<style lang="scss">
.nav-wrap {
    position: relative;

    .side {
        height: calc(100vh - 64px);
        width: 1px;
        position: absolute;
        overflow: visible;

        .side-bar {
            height: 100%;
            background-color: #cfcfcf;
            width: 1px;
            transition: 0.5s;
            overflow: hidden;

            &.active {
                width: 320px;
                z-index: 99;
                overflow: hidden;

                .item {
                    width: 33vw;
                }
            }
        }
    }

    .bar {
        display: flex;
        background-color: rgb(160, 173, 184);
        height: 64px;

        .toggle {
            margin: 20px 10px;
            transition: 0.5s;
            width: 40px;

            .line {
                width: 40px;
                height: 4px;
                background: #fcfcfc;
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

        .bar-items {
            display: flex;
            justify-content: space-evenly;
        }
    }
}
</style>
