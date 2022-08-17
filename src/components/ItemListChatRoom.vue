<template>
  <div class="search_list_item">
    <div class="search_list_item_wrap">
      <div class="search_list_item_info">
        <h3>{{ item.title }}</h3>
        <p>Date created:</p>
        <p>{{ getBeautifulDate(item.date_create) }}</p>
      </div>
      <div class="search_list_item_action">
        <my-button @click="clickItem"><slot name="btn_title"></slot></my-button>
      </div>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/MyButton";
import moment from 'moment';

export default {
  components: {MyButton},
  name: "ItemListChatRoom",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    clickItem() {
      this.$emit("onClickItem", this.item);
    },
    getBeautifulDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    }
  }
}
</script>

<style scoped>

.search_list_item {
  width: 100%;
  margin-bottom: 5px;
  height: 80px;
  background: #f3f2f2;
  border-radius: 15px;
}

.search_list_item_wrap {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.search_list_item_info {
  width: 70%;
}

</style>