<template>
  <h2>欢迎登陆聊天室</h2>
  <input type="text" placeholder="输入用户名" v-model.trim="username">
  <input type="button" value="登陆" @click="login">
</template>

<script setup>  
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";

// data 
const router = useRouter();
const username = ref("");


// life hook 
// 如果用户名存在 直接跳转到聊天室

onMounted(() => {
  const _username = JSON.parse(sessionStorage.getItem("username"));
  if(_username){
    router.push({path:"/home"})
  }
})



// function 
function login(){
  // 处理一下用户的异常处理
  if(username.value.length < 3){
    return;
  }

  sessionStorage.setItem("username",JSON.stringify(username.value))
  router.push({
    path:"/home"
  })

}






</script>