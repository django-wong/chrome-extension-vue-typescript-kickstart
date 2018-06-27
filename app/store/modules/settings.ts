import { ActionContext } from 'vuex';

type State = {
  sourceName: string
  sourcePassword: string
  userName: string
  userPassword: string
  siteIDs: number[]
}

const state: State = {
  sourceName: '',
  sourcePassword: '',
  userName: '',
  userPassword: '',
  siteIDs: []
}

const actions = {
  init({ commit }: ActionContext<State, any>) {
    return new Promise((resolve) => {
      chrome.storage.sync.get('settings', (data) => {
        if (!data.settings) {
          resolve();
          return;
        }
        commit('setSettings', data.settings);
        resolve();
      });
    })
  }
}

const mutations = {
  setSettings(state: any, settings: any | string, value?: any) {
    if(typeof settings === 'string'){
      let key = settings;
      settings = {};
      settings[key] = value;
    }
    for(let key in settings){
      if(settings.hasOwnProperty(key)){
        let value = settings[key];
        state[key] = value;
        chrome.storage.sync.set({'settings': state}, () => {});
      }
    }
  }
}


export default {
  state,
  actions,
  mutations
}