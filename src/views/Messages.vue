<template>
  <div class="wrapper">
    <div class="display-messages">
      <div>
        <div id="talkjs-container" style="width: 90%; margin: 30px; height: 500px">
          <i>Loading chat...</i>
        </div>
        <DisplayMessage msg="Welcome to Your Vue.js + TypeScript App"/>
      </div>
      <div>
        <h1>kjb</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DisplayMessage from '../components/DisplayMessage.vue'

@Options({
  components: {
    DisplayMessage
  },
  props: {
    
  }
})
export default class View extends Vue {
  
}
</script>
