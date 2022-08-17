<template>
  <div class="status_queue_window">
    <div class="status_bar">
      <div class="user_queue" v-if="currentQueue">
        <h3>Current</h3>
        <p class="user_queue_name">{{ currentQueueUser.username }}</p>
        <p class="user_queue_status">{{ currentQueue.status }}</p>
        <span><img src="@/assets/clock.svg" style="width: 15px;"> {{ getBeautifulDate(currentQueue.date_update_status) }}</span>
      </div>
      <div class="user_queue" v-else>
        <h3>Current</h3>
        <p class="user_queue_name">The queue is empty</p>
      </div>
      <div class="user_queue" v-if="nextQueue">
        <h3>Next</h3>
        <p class="user_queue_name">{{ nextQueueUser.username }}</p>
        <p class="user_queue_status">{{ nextQueue.status }}</p>
      </div>
      <div class="user_queue" v-else>
        <h3>Next</h3>
        <p class="user_queue_name">be the first</p>
      </div>
    </div>
    <queue-user-list
        :listQueue="listQueue"
        :currentUser="currentUser"
        :currentQueueUser="currentQueueUser"
        v-show="isDetailQueue"/>
    <div @click="flagDetailQueue"
         class="action_more_info"
         v-show="!isDetailQueue">
      <div>
        <h5>Подробнее</h5>
        <img src="@/assets/down.svg" style="width: 20px">
      </div>
    </div>
    <div @click="flagDetailQueue" class="action_more_info" v-if="isDetailQueue">
      <div>
        <img src="@/assets/up.svg" style="width: 20px">
        <h5>Свернуть</h5>
      </div>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/MyButton";
import QueueUserListItem from "@/components/QueueUserListItem";
import QueueUserList from "@/components/QueueUserList";
import moment from "moment";

export default {
  name: "QueueStatusBar",
  components: {QueueUserList, MyButton, QueueUserListItem},
  data() {
    return {
      isDetailQueue: false,
    }
  },
  props: {
    listQueue: {
      type: Array,
    },
    currentQueue: {
      type: Object,
    },
    currentQueueUser: {
      type: Object,
    },
    currentUser: {
      type: Object,
      required: true
    },
    nextQueueUser: {
      type: Object,
    },
    nextQueue: {
      type: Object,
    },
  },
  methods: {
    flagDetailQueue() {
      this.isDetailQueue = !this.isDetailQueue
    },
    getBeautifulDate(date) {
      return moment(date).fromNow("s");
    }
  },
}
</script>

<style scoped>

h3{
  color: #fac238;
  font-size: 40px;
  text-shadow: 2px 2px 2px #c0c0c0;
}

.status_queue_window {
  background: white;
  width: 80%;
  border-radius: 15px;
  padding: 0px 25px 0px 25px;
}

.status_bar {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: center;
}

.user_queue {
  width: 50%;
  border-radius: 25px;
  padding: 5px 0px;
}

.more_info_queue-enter-active, .more_info_queue-leave-active {
  transition: all .5s ease-in-out;
  opacity: 0.1;
}
.more_info_queue-enter-to {
  opacity: 1;
}

.more_info_queue-leave-to {
  transition: all .5s ease-in-out;
  opacity: 0.1;
}

.user_queue_name {
  font-size: 22px;
  font-weight: 500;
}

.user_queue_status {
  margin-left: 15px;
  font-size: 16px;
  font-weight: 300;
}

.action_more_info {
  text-align: center;
  cursor: pointer;
}

</style>