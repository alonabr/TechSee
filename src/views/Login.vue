<template>
  <div class="login-wrapper">
    <el-form :model="userModel" label-width="120px" class="form-container">
    <el-form-item label="Username">
      <el-input v-model="userModel.username" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">Login</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

 <script lang="ts">
import { UserModel } from '@/models/userModel'
import router from '@/router';
import { useStore } from '@/store';
import { computed, defineComponent, onMounted, PropType, watch } from 'vue'
  
  export default defineComponent({
    name: 'Login',
    props: {
      userModel: {
        type: Object as PropType<UserModel>,
        required:true,
        default: ""
       },
      errorLoginMsg: {
        type: String,
        required: true,
      },
    },

    setup(props) {
      const store = useStore();
      
      const login = async () => {
        const user = {
          username: props.userModel.username
        }as UserModel
        await store.dispatch("fetchUser");
      }

      const fetchUser = computed<UserModel>(() => { 
        return store.getters.getUser 
      })

      watch(fetchUser, (newUser: UserModel) => {
         if(newUser && newUser.username) {
           router.push('/chat')
         } else {
          alert("failed to login");
         }
       })

      return { login, fetchUser }
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
