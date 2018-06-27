import { ActionContext } from 'vuex';
import { CLIENT_RENEG_LIMIT } from 'tls';

type State = {
  name: string
}

const state: State = {
  name: ''
}

const actions = {
  init({ commit }: ActionContext<State, any>) {
    return true;
  }
}

const mutations = {
  changeName(state: State, name: string) {
    state.name = name;
  }
}

export default {
  state,
  actions,
  mutations
}