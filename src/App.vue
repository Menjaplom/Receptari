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
import { type DBConnection } from '@/services/database/dbInterface'
import { DBSqlite } from '@/services/database/sqlite/database'
import { MockDB } from './services/database/debug/mockDB'

const loggedInRef: Ref<boolean> = ref(true) // TODO: SET TO FALSE BY DEFAULT
provide(loggedInLit, loggedInRef)
// Modify at will
provide(usernameLit, 'Menjaplom')
provide(repoLit, 'Receptari')
provide(branchLit, 'gh-pages')
provide(commitMsgLit, 'Commit message')

//const db: Ref<DBConnection> = ref(new DBSqlite()) // COMMENTED DUE TESTING PORPUSES
const db: Ref<DBConnection> = ref(new MockDB())
provide(dbLit, db)
db.value.connect('' + dbURLLit + dbNameLit)
</script>

<template>
  <!--<nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/new">Go to new recipe</RouterLink>
  </nav>-->

  <HeaderBar />

  <main>
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Suspense>
          <!-- main content -->
          <component :is="Component"></component>

          <!-- loading state -->
          <template #fallback>
            Loading...
          </template>
        </Suspense>
      </template>
    </RouterView>
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
