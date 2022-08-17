<template>
  <div class="container">
    <div class="chat_window">
      <h2>Queue Rooms</h2>
      <div class="chat_room">
        <search-list-chat-rooms :listChatRooms="listEnteredQueueRooms"></search-list-chat-rooms>
      </div>
    </div>
  </div>
</template>

<script>
import MyInput from "@/components/MyInput";
import MyButton from "@/components/MyButton";
import SearchListChatRooms from "@/components/SearchListChatRooms";
import axios from "axios";

export default {
  components: {SearchListChatRooms, MyButton, MyInput},
  data() {
    return {
      listEnteredQueueRooms: [],
    }
  },
  methods: {
    async fetchListEnteredChatRooms() {
      const response = await axios.get('http://127.0.0.1:8000/queue_room/entered',
          {headers: {Authorization: `Bearer ${this.$store.getters.getToken}`}});
      this.listEnteredQueueRooms = response.data;
    }
  },
  mounted() {
    this.fetchListEnteredChatRooms();
  }
}
</script>

<style scoped>

.container {
  margin-top: 15%;
}

.chat_window {
  width: 50%;
  height: 500px;
  background: white;
  border-radius: 15px;
  padding: 15px;
}

h2 {
  text-align: center;
  color: #75d0ab;
  font-size: 40px;
  text-shadow: 2px 2px 2px #c0c0c0;
  padding: 5px;
}

@media screen and (max-width: 650px) {
  .chat_window {
    width: 80%;
  }
}

</style>