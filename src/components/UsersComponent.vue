<template>
  <div class="users-box">
    <h3 class="users-headline">ONLINE USERS:</h3>
    <ul class="users-list" v-for="(user, index) in users" :key="index">
      <li class="user-list-item">{{ user }}</li>
    </ul>
  </div>
</template>


<script lang="ts">
import { UserModel } from '@/models/userModel';
import { defineComponent, PropType } from 'vue';

  export default defineComponent({
    name: 'Users',
    props: {
      users: {
        type: Array,
        required:true
       },
       onlineUser: {
        type: Object as PropType<UserModel>,
        required:true
       }
    },
    setup() {

    }
  })
</script>

<style lang="scss" scoped>  
  </style>