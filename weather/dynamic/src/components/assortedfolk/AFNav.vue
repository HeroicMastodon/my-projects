<template>
    <div class="wrap">
        <div class="bar">
            <div :class="'toggle ' + activeClass" @click="activate()">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
            <div class="brand">
                <router-link :to="brandLink">
                    <slot name="brandContent"></slot>
                </router-link>
            </div>
            <div class="bar-items">
                <slot name="bars"></slot>
                <!-- <nav-item to="/">
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
            </nav-item> -->
            </div>
        </div>
        <div class="side">
            <div :class="'side-bar ' + activeClass">
                <nav-item to="/">
                    <template v-slot:link class="item">
                        Some Link
                    </template>
                </nav-item>
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

    activeClass = '';

    activate() {
        if (this.activeClass == '') {
            this.activeClass = 'active';
        } else {
            this.activeClass = '';
            
        }
    }
}
</script>
<style lang="scss" scoped>
.wrap {
    position: relative;

    .side {
        height: calc(100vh - 64px);
        width: 1px;
        position: absolute;
        overflow: visible;

        .side-bar {
            height: 100%;
            background-color: transparent;
            width: 1px;
            transition: 0.5s;
            overflow: hidden;

            &.active {
                background-color: black;
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

        .brand {
            background-color: white;
            padding: 10px;
            margin: 10px;
        }

        .bar-items {
            display: flex;
            justify-content: space-evenly;
        }
    }
}
</style>
