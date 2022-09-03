<template>
  <div class="login-wrapper" v-if="!isLoggedIn">
    <el-form :model="userModel" label-width="120px" class="form-container">
    <el-form-item label="Username">
      <el-input v-model="userModel.username" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">Login</el-button>
    </el-form-item>
  </el-form>
  </div>
  <div v-else>
    <chat-component />
  </div>
</template>

 <script lang="ts">
import { UserModel } from '@/models/userModel'
import { useStore } from '@/store';
import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue'
import ChatComponent from '@/components/ChatComponent.vue'
  
  export default defineComponent({
    name: 'Login',
    components:{
      ChatComponent
    },
    props: {
      errorLoginMsg: {
        type: String,
        required: true,
      },
    },
    
    setup(props) {
      const store = useStore();
      const userModel = ref({}as UserModel);
      
      const login = async () => {
        const user = {
          username: userModel.value.username
        }as UserModel
        await store.dispatch("setLoginUser", user);
      }

      const fetchUser = computed<UserModel>(() => { 
        return store.getters.getUser 
      })

      const isLoggedIn = computed<boolean>(() => { 
        return store.getters.isLoggedIn
      })

      return { login, fetchUser, userModel, isLoggedIn }
    },
  })
  </script>

<style lang="scss" scoped>
  .login-wrapper {
    display: flex;
    flex-direction: row;
    align-items: left;
    width: 400px;
    border: 0.3px solid grey;
    padding: 10px;
  }
</style>
