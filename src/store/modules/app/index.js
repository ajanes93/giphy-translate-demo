import * as mutationTypes from "./mutation-types";
import api from "../../api";
import _ from "underscore";
import uuid from "uuid";

const namespaced = true;

const initialState = () => ({
  title: "Teen Tech Demo (07449575937)",
  responses: []
});

const state = initialState();

const getters = {
  title: state => state.title,
  responses: state => state.responses,
  images: state =>
    _.map(state.responses, response => ({
      ...response.images,
      uuid: response.uuid,
      data: response.data
    }))
};

const actions = {
  translate: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      api.translate({ s: data.s }).then(
        response => {
          let duplicate = false;

          if (response.data && !_.isEmpty(response.data)) {
            const ids = _.pluck(state.responses, "id");
            duplicate = _.contains(ids, response.data.id);

            if (!duplicate) {
              response.data.data = data.data;
              response.data.uuid = uuid.v4();
              commit(mutationTypes.ADD_RESPONSE, response.data);
            }
          }

          resolve(duplicate);
        },
        error => {
          reject(error);
        }
      );
    });
  },
  clearResponses({ commit }) {
    commit(mutationTypes.CLEAR_RESPONSES);
  },
  removeResponse({ commit, state }, uuid) {
    const index = _.findIndex(state.responses, { uuid });

    if (index !== -1) {
      commit(mutationTypes.REMOVE_RESPONSE, index);
    }
  },
  setTitle: async ({ commit }, title) =>
    commit(mutationTypes.SET_APP_TITLE, title),
  resetApp: async ({ commit }, title) => commit(mutationTypes.RESET_APP)
};

const mutations = {
  [mutationTypes.SET_APP_TITLE](state, title) {
    state.title = title;
  },
  [mutationTypes.ADD_RESPONSE](state, data) {
    state.responses.unshift(data);
  },
  [mutationTypes.REMOVE_RESPONSE](state, index) {
    state.responses.splice(index, 1);
  },
  [mutationTypes.CLEAR_RESPONSES](state, data) {
    state.responses = [];
  },
  [mutationTypes.RESET_APP](state) {
    Object.assign(state, initialState());
  }
};

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
};
