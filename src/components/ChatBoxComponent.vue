<template>
  <div class="chat-box">
    <div class="chat-area" ref="chatArea">
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
  setup() {
    let chatArea : any = ref(null)
    let refscrollHeight: any = ref(null)


    const update = () => {
      nextTick(() => {
        chatArea.value?.scrollTo({
          behavior: 'smooth',
          top: refscrollHeight.value.clientHeight,
        })
      })
    }

    onUpdated(update);

    return {
      update,
      refscrollHeight,
      chatArea
    }
  }
  })
</script>

<style lang="scss" scoped>
  .chat-box {
  width: 100%;
  height: 368px;
  margin: 1rem;
  margin-top: -15px;
  .chat-area {
    width: 100%;
    height: 100%;
    box-shadow: 7px 5px 46px -16px #a9bdae;
    border: 2px solid #8b9194;
    background-color: #8b9194;
    overflow: auto;
    .chat-message-item {
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      color: #000;
      overflow: auto;
      .message-item {
        display: inline-flex;
        margin: 0.5rem 1rem;
        .message-text {
          background-color: #5b5f61;
          margin-top: 0;
          text-align: left;
          padding: 0.8rem;
        }
        .message-user {
          display: flex;
          text-align: left;
          padding: 0.5rem;
        }
        .message-date {
          font-weight: 200;
        }
      }
    }
    .message-is-typing {
      font-weight: 600;
      padding: 1rem;
      text-align: left;
    }
  }
  /*********SEND_MESSAGE*************/

  .send-form {
    width: 100%;
    .send-box {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      width: 60%;
      margin: 1rem 1rem;
      padding: 1rem 0;
      .send-input {
        width: 100%;
      }
    }
    .btn-box {
      width: 40%;
      .send-button {
        width: 100%;
        padding: 1rem;
      }
    }
  }
}
</style>