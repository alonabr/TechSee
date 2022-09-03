<template>
  <div class="chat-wrapper" ref="chatArea">
      <div class="chat-message-item" ref="refscrollHeight">
        <div class="message-item" v-for="(message, index) in messages" :key="index">
          <div class="h-message-item">
            <b class="message-user">{{ message.username }} </b>
            <p class="message-text" >
              {{ message.message }}
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { MessageModel } from '@/models/messageModel';
import { defineComponent, nextTick, onUpdated, PropType, ref } from 'vue';

  export default defineComponent({
    name: 'ChatBoxComponent',
    props: {
    messages: {
      type: Array as PropType<MessageModel[]>,
      required: true
    },
  },
  setup(props) {
    //let chatArea : any = ref(null)
    //let refscrollHeight: any = ref(null)
    // const update = () => {
    //   nextTick(() => {
    //     chatArea.value?.scrollTo({
    //       behavior: 'smooth',
    //       top: refscrollHeight.value.clientHeight,
    //     })
    //   })
    // }

    // onUpdated(update);

    return {
      //update,
    }
  }
  })
</script>

<style lang="scss" scoped>
  .chat-wrapper {
    border: 1px solid black;
    //background: grey;
  }
</style>