import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { State, state } from './state';
import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';

Vue.use(Vuex);


const store: StoreOptions<State> = {
    state,
	actions,
	mutations,
	getters
}

export default new Vuex.Store<State>(store);