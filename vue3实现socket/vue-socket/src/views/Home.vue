<template>
  <ul>
    <li v-for="item in msgList" :key="item.id">
      <span>{{ item.username + "\t" }}</span>
      <span>{{ item.msg + "\t"}}</span>
      <span>{{ new Date(item.date).toLocaleString() }}</span>
    </li>
  </ul>

  <input type="text" placeholder="输入聊天信息" v-model.trim="msg" />
  <input type="button" value="发送" @click="_sendMsg" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import useSocket from "/src/hooks/use-socket.js";

// data
const msg = ref("");
const msgList = ref([]);
let username = "";
const router = useRouter();
const { sendMsg } = useSocket(handleMessage);

// life onMounted
onMounted(() => {
  username = window.sessionStorage.getItem("username");

  if (!username) {
    router.push({ path: "/" });
  }
});

// function
function _sendMsg() {
  if (!msg.value.length) {
    return;
  }

  const nowMsg = {
    id: parseInt(Date.now() * Math.random()),
    username,
    msg: msg.value,
    date: Date.now(),
  };

  sendMsg(nowMsg);
}

function handleMessage(e) {
  const val = JSON.parse(e.data);
  msgList.value.push(val);
}

</script>
