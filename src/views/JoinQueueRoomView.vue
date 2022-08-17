<template>

</template>

<script>
import axios from "axios";

export default {
  name: "JoinQueueRoomView",
  methods: {
    async joinQueueRoom() {
      await axios.get('http://127.0.0.1:8000/queue_room/join_queue/'+ this.$route.params.token +'/',
          {headers: {Authorization: `Bearer ${this.$store.getters.getToken}`}})
          .then(response => {
            this.$router.push({name: 'queueRoom', params: {chat_id: response.data.id}, replace: true});
          })
          .catch(err => {
            alert(err);
          });
    }
  },
  created() {
    this.joinQueueRoom();
  }
}
</script>

<style scoped>

</style>