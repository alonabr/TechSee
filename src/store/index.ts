import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { UserModel } from '@/models/userModel'
import { InjectionKey } from 'vue'
import axios from 'axios'

export interface State {
  currentUser: UserModel | null,
  users: UserModel[] 
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    currentUser: null,
    users: []
  },
  getters: {
    getUser: (state) : UserModel | null => state.currentUser,
    getUsers: (state) : UserModel[] => state.users || [] as UserModel[]
  },
  mutations: {
    SET_USER(state, user) {
      state.currentUser = user
    },
    SET_USERS(state, users) {
      state.users = users
    }
  },
  actions: {
    async fetchUser({ commit }) {
      try {
        const data = await axios.get('https://jsonplaceholder.typicode.com/user')
        commit('SET_USER', data.data)
      } catch(error: any) {
        alert(error)
        console.log(error)
      }
    },
    async fetchUsers({ commit }) {
      try {
        //const data = await axios.get('https://jsonplaceholder.typicode.com/users')
        await new Promise(r => setTimeout(r, 2000))
        const data: any = {}
        data.data = [
          {
            username: 'alon'
          },
          {
            username: 'moshe'
          }
        ]as UserModel[]
        commit('SET_USERS', data.data)
      } catch(error: any) {
        alert(error)
        console.log(error)
      }
    }
  },
  modules: {
  }
})

export function useStore () {
  return baseUseStore(key)
}
