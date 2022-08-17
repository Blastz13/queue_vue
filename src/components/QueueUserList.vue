<template>
  <div class="list_info">
    <div class="list_status_queue">
      <div class="list_queue_user"
           v-for="queue_user in listQueue"
           :key="queue_user.id">
        <queue-user-list-item :queue_user="queue_user"
                              :currentUser="currentUser"/>
      </div>
    </div>
    <div class="action_queue">
      <div class="action_user">
        <my-button style="background: green;"
                   class="action_button"
                   @click="addToQueue"
                   v-if="!isConsistQueue && !isCurrentQueue">Add to queue</my-button>
        <my-button style="background: orange;"
                   class="action_button"
                   @click="updateStatusInQueue"
                   v-if="isCurrentQueue">Change status</my-button>
        <my-button style="background: red;"
                   class="action_button"
                   @click="deleteFromQueue"
                   v-if="isConsistQueue">Remove from queue</my-button>
        <my-button style="background: limegreen;"
                   class="action_button"
                   @click="copyInviteLink" >Copy invite token</my-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import QueueUserListItem from "@/components/QueueUserListItem";
import MyButton from "@/components/MyButton";

export default {
  name: "QueueUserList",
  components: {QueueUserListItem, MyButton},
  props: {
    listQueue: {
      type: Array,
    },
    currentUser: {
      type: Object,
    },
    currentQueueUser: {
      type: Object,
    },
  },
  methods: {
    async addToQueue() {
      await axios.post('http://127.0.0.1:8000/'+ this.$route.params.chat_id + '/',
          {}, {headers: {Authorization: `Bearer ${this.$store.getters.getToken}`}}).catch(err => {
        alert(err);
      });
    },
    async updateStatusInQueue() {
      await axios.put('http://127.0.0.1:8000/'+ this.$route.params.chat_id + '/',
          {},{headers: {Authorization: `Bearer ${this.$store.getters.getToken}`}}).catch(err => {
        alert(err);
      });
    },
    async deleteFromQueue() {
      await axios.delete('http://127.0.0.1:8000/queue/'+ this.$route.params.chat_id + '/',
          {headers: {Authorization: `Bearer ${this.$store.getters.getToken}`}}).catch(err => {
        alert(err);
      });
    },
    async copyInviteLink() {
      await axios.get('http://127.0.0.1:8000/queue_room/generate_token/'+ this.$route.params.chat_id + '/',
          {headers: {Authorization: `Bearer ${this.$store.getters.getToken}`}})
          .then(response => {
            navigator.clipboard.writeText('http://localhost:8080/join_queue/' + response.data.token);
          })
          .catch(err => {
            alert(err);
          });
    },
  },
  computed: {
    isConsistQueue() {
      return this.listQueue.some(queue => queue.user.id === this.currentUser.id);
    },
    isCurrentQueue() {
      if (this.currentQueueUser != null){
        return this.currentQueueUser.id === this.currentUser.id;
      }
      return false;
    }
  }
}
</script>

<style scoped>

.list_queue_user {
  display: flex;
}

.list_info {
  display: flex;
  justify-content: space-between;
}

.action_queue {
  width: 50%;
  display: flex;
  justify-content: right;
  flex-wrap: wrap;
}

.action_user {
  display: flex;
  flex-wrap: wrap;
}

.list_status_queue {
  width: 50%;
}

.list_status_queue {
  overflow-y: scroll;
  height: 200px;
}

.action_button {
  font-size: 16px;
  color: white;
  width: 150px;
  height: 80px;
  margin: 5px;
}

@media (max-width: 900px) {
  .list_queue_user {
    flex-wrap: wrap;
  }

  .list_status_queue {
    overflow-y: scroll;
    height: 300px;
  }

  .action_user {
    flex-direction: column;
  }

  .action_button {
    width: 120px;
  }
}

</style>