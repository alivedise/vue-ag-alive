import Vue from 'vue';
import Vuex from 'vuex';
import EquipmentDataManager from '../models/EquipmentDataManager';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    equipments: [],
  },
  mutations: {
    save(state, equipment) {
      const e = EquipmentDataManager.save(equipment);
      state.equipments.push(e);
    },
    setEquipments(state, equipments) {
      Vue.set(state, 'equipments', equipments);
    },
    removeEquipment(state, item) {
      EquipmentDataManager.remove(item);
      const index = state.equipments.findIndex((i) => i.id === item.id);
      state.equipments.splice(index, 1);
    },
  },
  actions: {
    fetchData({ commit }) {
      commit('setEquipments', JSON.parse(JSON.stringify(EquipmentDataManager.data)));
    },
  },
  modules: {
  },
});
