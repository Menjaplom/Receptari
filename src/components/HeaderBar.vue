<script setup lang="ts">
import { Octokit, App, RequestError } from 'octokit'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import PopUp from '@/components/misc/PopUp.vue'
import { inject } from 'vue'
import { loggedInLit } from '@/literals'

let popupVisible = ref(false)
let token = ref((localStorage.getItem('tokenReceptari') || '')!)
console.log('token = ' + token.value)
const loggedIn: Ref<boolean> = inject(loggedInLit) as Ref<boolean>
checkToken()

// Function to check if a token is valid
async function checkToken() {
  try {
    const octokit = new Octokit({ auth: token.value })
    await octokit.request('GET /user')
    console.log('Token is valid.')
    loggedIn.value = true
    localStorage.setItem('tokenReceptari', token.value)
  } catch (error) {
    if (error instanceof RequestError) {
      if (error.status === 401) {
        console.log('Invalid token.')
      }
    } else {
      console.log('Invalid token.')
    }
    loggedIn.value = false
  }
}

function logOut() {
  localStorage.removeItem('tokenReceptari')
}
</script>

<template>
  <header>
    <nav>
      <ul>
        <li><RouterLink to="/new">Add recipe</RouterLink></li>
        <li>Add component</li>
      </ul>
    </nav>
    <h1><RouterLink to="/">Receptari</RouterLink></h1>
    <span @click="popupVisible = !popupVisible">
      <img v-if="!loggedIn" class="not_login" src="./icons/not_login.png" />
      <img v-else class="not_login" src="./icons/ok.svg" />
    </span>
    <PopUp v-model:visible="popupVisible">
      <div v-if="!loggedIn">
        <p>token</p>
        <input v-model="token" />
        <button @click="checkToken()">validate token</button>
      </div>
      <div v-else>
        <p>Do you wanna log out</p>
        <button @click="logOut()">Log out</button>
      </div>
    </PopUp>
  </header>
</template>

<style scoped>
header {
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: black;
  color: white;
  width: 100%;
  display: inline-block;
}

header nav {
  display: inline-block;
  margin-left: 0;
  margin-right: auto;
  width: 33%;
}

header h1 {
  display: inline-block;
  margin-bottom: auto;
  margin-top: auto;
  width: 33%;
  text-align: center;
  height: 100%;
}

header > span {
  display: inline-block;
  margin-left: auto;
  margin-right: 0;
  width: 33%;
}

header img {
  width: 50px;
  float: right;
}
</style>
