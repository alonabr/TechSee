import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { UserModel } from '@/models/userModel'
import { InjectionKey } from 'vue'
import axios from 'axios'
import { io } from 'socket.io-client'
import { MessageModel } from '@/models/messageModel'


//const data = await axios.get('http://localhost:3000//api/v1/socket/users');

export interface State {
  currentUser: UserModel | null,
  loggedIn: boolean
  users: UserModel[],
  messages: MessageModel[]
}

export const key: InjectionKey<Store<State>> = Symbol()
const socket = io('http://localhost:3000')

socket.on('userLoggedIn', (username: string) => {
  store.commit('SET_USER', username)
})

socket.on('getUsers', (users: UserModel[]) => {
  store.commit('SET_USERS', users)
})

socket.on('getMessages', (messages: MessageModel[]) => {
  store.commit('SET_MESSAGES', messages)
})

socket.on('newMessage', (message: MessageModel) => {
  const messages = [...store.state.messages, message]
  store.commit('SET_MESSAGES', messages)
})

socket.on('userDisconnected', (user: UserModel) => {
  const users = store.state.users.filter(u => u !== user)
  store.commit('SET_USERS', users)
})

export const store = createStore<State>({
  state: {
    currentUser: null,
    loggedIn: false,
    users: [],
    messages: []
  },
  getters: {
    getUser: (state) : UserModel | null => state.currentUser,
    isLoggedIn: (state) : boolean => state.loggedIn,
    getUsers: (state) : UserModel[] => state.users || [] as UserModel[],
    getMessages: (state) : MessageModel[] => state.messages || [] as MessageModel[]
  },
  mutations: {
    SET_USER(state, user) {
      state.currentUser = user;
      state.loggedIn = true;
    },
    SET_USERS(state, users) {
      state.users = users
    },
    SET_MESSAGES(state, messages) {
      state.messages = messages
    }
  },
  actions: {
    async setLoginUser({ }, user: UserModel) {
      try {
        socket.emit('enterUsername', { username: user.username })
      } catch(error: any) {
        alert(error)
        console.log(error)
      }
    },
    async fetchUsers() {
      try {
        const res: any = socket.emit('getUsers');
      } catch(error: any) {
        alert(error)
        console.log(error)
      }
    },
    async fetchMessages() {
      try{
        const res: any = socket.emit('getMessages');
      }catch(error) {
        alert(error)
        console.log(error)
      }
    },
    async sendMessage({}, message) {
      try{
        const res: any = socket.emit('newMessage', message);
      }catch(error) {
        alert(error)
        console.log(error)
      }
    },
  },
  modules: {
  }
})

export function useStore () {
  return baseUseStore(key)
}
