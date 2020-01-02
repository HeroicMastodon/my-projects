import { Module } from 'vuex';
import { UserState } from './state';
import { RootState } from '../index';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';


export const state: UserState = {
    user: {},
    places: [
        'springville',
        'provo',
        'sundance',
        'salt lake city, Ut'
    ]
}


export const namespace: string = 'user';


export const user: Module<UserState, RootState> = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}