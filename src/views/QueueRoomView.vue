<template>
  <div class="container">
    <queue-status-bar :listQueue="listQueue"
                      :currentUser="currentUser"
                      :currentQueue="currentQueue"
                      :currentQueueUser="currentQueueUser"
                      :nextQueue="nextQueue"
                      :nextQueueUser="nextQueueUser"/>
    <div class="chat_window">
      <div class="chat_message_list" ref="chatContainer">
        <item-message-chat
            v-for="item in listMessages"
            :item="item"/>
      </div>
      <form @submit.prevent>
        <div class="chat_action_form">
            <my-input class="chat_input_message" placeholder="Message..." v-model="userMessage"></my-input>
            <my-button class="chat_btn" @click="sendMessage">Send</my-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import MyInput from "@/components/MyInput";
import MyButton from "@/components/MyButton";
import ItemMessageChat from "@/components/ItemMessageChat";
import QueueStatusBar from "@/components/QueueStatusBar";
import axios from "axios";

export default {
  components: {QueueStatusBar, ItemMessageChat, MyButton, MyInput},
  data() {
    return {
      listMessages: [],
      userMessage: "",
      listQueue: [],
      currentQueue: {},
      nextQueue: {},
      currentQueueUser: {},
      nextQueueUser: {},
      currentUser: {}
    }
  },
  methods: {
    connectWebSocket() {
      this.chatSocket = new WebSocket(`ws://localhost:8000/chat/ws/` + this.$route.params.chat_id + "/" + this.$store.getters.getToken);
      this.chatSocket.onopen = () => {
        this.chatSocket.onmessage = ({data}) => {
          const response = JSON.parse(data);
          switch (response.action) {
            case "updateListQueue":
              this.listQueue = response.data;
              try{
                this.nextQueueUser = this.listQueue[0].user;
                this.nextQueue = this.listQueue[0];
              }catch (e) {
                this.nextQueueUser = null;
                this.nextQueue = null;
              }
              break;
            case "updateCurrentQueue":
              try{
                this.currentQueue = response.data;
                this.currentQueueUser = response.data.user;
              }catch (e) {
                this.currentQueue = null;
                this.currentQueueUser = null;
              }
              break;
            case "messageChat":
              this.listMessages.push(response);
              this.scrollToDown();
              break;
          }
        };
      };
    },
    async fetchListQueue() {
      await axios.get('http://127.0.0.1:8000/queue/'+ this.$route.params.chat_id +'/',
          {headers: {Authorization: `Bearer ${this.$store.getters.getToken}`}}).then(response => {
        this.listQueue = response.data;
        try{
          this.nextQueueUser = this.listQueue[0].user;
          this.nextQueue = this.listQueue[0];
        }catch (e){
          this.nextQueueUser = null;
          this.nextQueue = null;
        }
      });
    },
    async fetchCurrentQueue() {
      await axios.get('http://127.0.0.1:8000/queue/'+ this.$route.params.chat_id +'/current/',
          {headers: {Authorization: `Bearer ${this.$store.getters.getToken}`}}).then(response => {
        this.currentQueue = response.data;
        this.currentQueueUser = response.data.user;
      });
    },
    async fetchCurrentUser() {
      await axios.get('http://127.0.0.1:8000/queue_room/'+ this.$route.params.chat_id +'/',
          {headers: {Authorization: `Bearer ${this.$store.getters.getToken}`}}).then(response => {
      this.currentUser = response.data;
      });
    },
    async fetchListMessages() {
      await axios.get('http://127.0.0.1:8000/chat/'+ this.$route.params.chat_id +'/',
          {headers: {Authorization: `Bearer ${this.$store.getters.getToken}`}}).then(response => {
        this.listMessages = response.data.sort((a,b) => a.id < b.id ? -1 : 1);
        this.listMessages.forEach(value => {value.is_own_message = (value.user_id === this.currentUser.id)})
        this.scrollToDown();
      });
    },
    sendMessage() {
      this.chatSocket.send(this.userMessage);
      this.userMessage = "";
    },
    scrollToDown() {
      let container = this.$refs.chatContainer;
      container.scrollTop = container.scrollHeight;
    }
  },
  created() {
    this.connectWebSocket();
  },
  mounted() {
    this.fetchListQueue();
    this.fetchCurrentQueue();
    this.fetchCurrentUser();
    this.fetchListMessages();
  },
}
</script>

<style scoped>

.container {
  margin-top: 2%;
  margin-bottom: 2%;
}

.chat_window {
  margin-top: 15px;
  width: 80%;
  background: white;
  border-radius: 15px;
  padding: 25px 25px 5px 25px;
  -webkit-box-shadow: 18px 23px 30px -20px rgba(34, 60, 80, 0.7);
  -moz-box-shadow: 18px 23px 30px -20px rgba(34, 60, 80, 0.7);
  box-shadow: 18px 23px 30px -20px rgba(34, 60, 80, 0.7);
}

.chat_message_list {
  width: 100%;
  overflow-y: scroll;
  height: 500px;
}

.chat_action_form {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.chat_input_message {
  background-color: #f8f8f8;
  border: 2px solid #ccc !important;
  height: 50px;
}

.chat_btn {
  height: 50px;
  margin-left: 10px;
}

</style>