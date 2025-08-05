<script setup lang="ts">
//import { Octokit /*, RequestError*/ } from 'https://esm.sh/@octokit/core@4.2.2'
import {
  mdiHome,
  mdiAccount,
  mdiAccountAlert
} from '@mdi/js'

import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { inject } from 'vue'
import { loggedInLit } from '@/literals'

const popNavDrawer = ref(false)
let token = ref((localStorage.getItem('tokenReceptari') || '')!)
console.log('token = ' + token.value)
const loggedIn: Ref<boolean> = inject(loggedInLit) as Ref<boolean>
checkToken()

// Function to check if a token is valid
async function checkToken() {
  `try {
    const octokit = new Octokit({ auth: token.value })
    await octokit.request('GET /user')
    console.log('Token is valid.')
    loggedIn.value = true
    localStorage.setItem('tokenReceptari', token.value)
  } catch (error) {
    /*if (error instanceof RequestError) {
      if (error.status === 401) {
        console.log('Invalid token.')
      }
    } else {
      console.log('Invalid token.')
    }*/
    loggedIn.value = false
  }`
}

function logOut() {
  //localStorage.removeItem('tokenReceptari')
}
</script>

<template>
  <v-app-bar :elevation="2">
    <template v-slot:prepend>
      <v-app-bar-nav-icon variant="text"
          @click.stop="popNavDrawer = !popNavDrawer"/>
    </template>

    <v-app-bar-title>Application Bar</v-app-bar-title>

    <template v-slot:append>
      <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">  
         <v-icon :icon="loggedIn? mdiAccount: mdiAccountAlert" v-bind="activatorProps"/>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card v-if="loggedIn" title="Logged in">
            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text="Log out" @click="loggedIn = false"/>
              <v-btn
                text="Close Dialog"
                @click="isActive.value = false"
              ></v-btn>
            </v-card-actions>
          </v-card>

          <v-card v-else title="Logged out">
            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text="Log in" @click="loggedIn = true"/>

              <v-btn
                text="Close Dialog"
                @click="isActive.value = false"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="popNavDrawer"
    :location="$vuetify.display.mobile ? 'bottom' : undefined">
    
    <ul>
      <li><RouterLink :to="{ name: 'newRecipe' }">Add recipe</RouterLink></li>
      <li>Add component</li>
    </ul>
  </v-navigation-drawer>
</template>



<!--<style scoped>
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
</style>-->
