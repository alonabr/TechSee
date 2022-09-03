<template>
  <div class="chat-wrapper">
    <div class="users">
      <users-component v-model:users="computedUsers" :online-user="computedUser" />
    </div>
    <div class="chat-container">
      <div class="chat-box">
        <chat-box-component :messages="computedMessages"/>
      </div>
      <div class="message-wrapper">
        <el-form :model="form" label-width="120px" class="form-container">
        <el-form-item label="Message" prop="message" class="text-message">
          <el-input v-model="form.message" type="textarea"/>
        </el-form-item>
        <el-form-item class="send-message">
          <el-button type="success" @click="sendMessage">Send</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { UserModel } from '@/models/userModel';
  import { computed } from '@vue/reactivity';
  import { defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue'
  import { useStore } from '@/store';
  import  UsersComponent from '@/components/UsersComponent.vue'
  import  ChatBoxComponent from '@/components/ChatBoxComponent.vue'
  import io from 'socket.io-client'
  import { MessageModel } from '@/models/messageModel';
  
  
  export default defineComponent({
    name: 'ChatComponent',
    props: {
    },
  
    components: {
      UsersComponent,
      ChatBoxComponent
    },
    setup() {
      
      const store = useStore();
      const form = reactive({
       message: ''
      })
  
      onMounted(async () => {
        await store.dispatch("fetchUsers");
        await store.dispatch("fetchMessages");
      })
  
      const computedUser = computed<UserModel>(() => {
        return store.getters.getUser
      })
  
      const computedUsers = computed<UserModel[]>({
        get() { return store.getters.getUsers },
        set(value) { store.commit('SET_USERS', value) }
      })
  
      const computedMessages = computed<MessageModel[]>(() => store.getters.getMessages)
  
      // watch(computedMessages, (newMessages: MessageModel[], oldMessages: MessageModel[]) => {
      //   if(newMessages.length > oldMessages.length) {
      //   //scroller
      //   }
      // })
  
      const sendMessage = async () => {
        const message: MessageModel = {
          username: store.state.currentUser!,
          message: form.message
        }
        await store.dispatch("sendMessage", message);
        form.message = ''
      }
  
      return {
        computedUsers,
        form,
        sendMessage,
        computedUser,
        computedMessages
      }
    },
  })
  </script>
  
  <style lang="scss" scoped>
  .chat-wrapper {
    padding: 0px 5px;
    justify-content: center;
    display: flex;
    flex-direction: row;
    //position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    
    .users {
      flex:1;
      margin: 0px 20px 0px 3px;
      border: 0.2px solid grey;
  
    }
    .chat-container {
      flex: 3;
      display: flex;
      flex-direction: column;
      .message-wrapper {
        flex: 1;
      }
    }
  
    .chat-box {
      width: 800px;
      height: 410px;
    }
    .form-container {
      position: fixed;
      justify-content: center;
      width: 800px;
      display: flex;
      flex-direction: row;
      bottom: 0px;
    }
  }
  
  .text-message {
    flex: 4;
  }
  
  .send-message {
    flex:1;
  }
  
  </style>