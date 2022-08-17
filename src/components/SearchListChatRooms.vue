<template>
  <div class="search_chat_rooms">
    <div class="action_chat_room">
      <my-input class="search_input" placeholder="Search..." v-model="searchQuery"/>
      <my-button class="create_button" @click="this.isShowDialog = true;">Create</my-button>
    </div>
    <dialog-window v-model:isShowDialog="isShowDialog">
      <my-input class="search_input" placeholder="Title queue room" v-model="titleQueueRoom"/>
      <my-button class="create_button" @click="createQueueRoom">Create</my-button>
    </dialog-window>
    <div class="search_list_chat_rooms">
      <item-list-chat-room v-for="item in searchedListChatRooms"
                           :key="item.id"
                           :item="item"
                           @onClickItem="joinToChatRoom">
        <template v-slot:btn_title>Join</template>
      </item-list-chat-room>
    </div>
  </div>
</template>

<script>
import MyInput from "@/components/MyInput";
import MyButton from "@/components/MyButton";
import ItemListChatRoom from "@/components/ItemListChatRoom";
import axios from "axios";
import DialogWindow from "@/components/DialogWindow.vue";

export default {
  components: { ItemListChatRoom, MyButton, MyInput, DialogWindow, DialogWindow },
  name: "SearchListChatRooms",
  data() {
    return {
      searchQuery: "",
      isShowDialog: false,
      titleQueueRoom: ""
    }
  },
  props: {
    listChatRooms: {
      type: [],
      required: true
    }
  },
  methods: {
    joinToChatRoom(item) {
      this.$router.push({name: 'queueRoom', params: {chat_id: item.id}});
    },
    async createQueueRoom() {
      const response = await axios.post('http://127.0.0.1:8000/queue_room',
          {"title": this.titleQueueRoom},
          {headers: {Authorization: `Bearer ${this.$store.getters.getToken}`}})
      .then(response => {
        this.$router.push({name: 'queueRoom', params: {chat_id: response.data.id}});
      });
    }
  },
  computed: {
    searchedListChatRooms() {
      return this.listChatRooms.filter(task => task.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  }
}
</script>

<style scoped>

.action_chat_room {
  display: flex;
  justify-content: space-between;
  align-items: center;
  vertical-align: center;
}

.create_button {
  padding: 17px;
  margin: 0px 0px 15px 5px;
}

.search_input {
  background-color: #f8f8f8;
  border: 2px solid #ccc !important;
  height: 50px;
}

.search_list_chat_rooms {
  overflow-y: scroll;
  height: 300px;
}

@media (min-width: 375px) {
  .search_list_chat_rooms {
    height: 360px;
  }
}

</style>