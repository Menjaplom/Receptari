<script setup lang="ts">
import HeaderBar from './components/HeaderBar.vue'
import { ref, provide } from 'vue'
import type { Ref } from 'vue'
import {
  loggedInLit,
  usernameLit,
  repoLit,
  branchLit,
  commitMsgLit,
  dbLit,
  dbNameLit,
  dbURLLit
} from './literals'
import { type dbConnection } from '@/services/database/dbInterface'
import { DBSqlite } from '@/services/database/sqlite/database'

const loggedInRef: Ref<boolean> = ref(false)
provide(loggedInLit, loggedInRef)
// Modify at will
provide(usernameLit, 'Menjaplom')
provide(repoLit, 'Receptari')
provide(branchLit, 'gh-pages')
provide(commitMsgLit, 'Commit message')

const db: Ref<dbConnection> = ref(new DBSqlite())
provide(dbLit, db)
db.value.connect('' + dbURLLit + dbNameLit)
</script>

<template>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/new">Go to new recipe</RouterLink>
  </nav>

  <HeaderBar />

  <main>
    <RouterView />
  </main>
</template>

<!-- 

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
 -->
