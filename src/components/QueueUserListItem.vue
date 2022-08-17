<template>
  <div class="queue_user_list_item">
    <div class="queue_user_info">
      <p class="user_queue_name">{{ queue_user.user.username }}</p>
      <p class="user_queue_status">{{ queue_user.status }}</p>
    </div>
    <div class="action_queue_user"
         v-if="currentUser.is_admin">
      <div class="dropdown">
        <button @click="adminAction" class="admin_action">Action</button>
        <div class="dropdown-content" ref="adminAction">
          <my-button class="action_queue_user__btn">delete from queue</my-button>
          <my-button class="action_queue_user__btn">kick from room</my-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/MyButton";

export default {
  name: "QueueUserListItem",
  components: {MyButton},
  props: {
    queue_user: {
    type: Object,
    required: true
  },
  currentUser: {
    type: Object,
    required: true
  }
  },
  methods: {
    adminAction() {
      this.$refs.adminAction.classList.toggle("show");
    },
  }
}
</script>

<style scoped>

.queue_user_list_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.action_queue_user__btn {
  font-size: 10px;
  width: 120px;
  padding: 10px;
  background: red;
  margin: 5px;
}

.action_queue_user {
  margin-left: 15px;
}

.admin_action {
  background-color: #3498DB;
  color: white;
  padding: 5px;
  border-radius: 15px;
  font-size: 12px;
  border: none;
  cursor: pointer;
}

.admin_action:hover, .admin_action:focus {
  background-color: #2980B9;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 10;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #ddd}

.show {display:block;}

.queue_user_info {
  display: flex;
}

.user_queue_status {
  margin-left: 15px;
}

</style>