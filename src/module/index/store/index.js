'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations.js';
Vue.use(Vuex);
const state = {
  userInfo: {
    userid: "",
    nickname: "NULL",
    invite: null
  },
  status: "offLine",
  tmpUrl:""
};
export default new Vuex.Store({
  state,
  mutations
});
