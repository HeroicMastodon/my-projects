import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { weather } from './weather';

Vue.use(Vuex);


export interface RootState {
    
}
const store: StoreOptions<RootState> = {
    state: {
        test: 'string'
    },
    modules: {
        weather
    }
}

export default new Vuex.Store<RootState>(store);
