<script async setup lang="ts">
import { dbLit } from '@/literals';
import type { DBConnection } from '@/services/database/dbInterface';
import type { Tag } from '@/types/Tag';
import { HSLToHexStr, newHSLPastel } from '@/utils/colors';
import { computed, inject, ref, type Ref } from 'vue';

let recipeTags = defineModel<Array<Tag>>('newTags', { required: true })

const db: Ref<DBConnection> = inject(dbLit) as Ref<DBConnection>
await db.value.waitForConnection()
const allTagList = await db.value.getAllTags()

const freeTags = computed(()=> allTagList.filter((allT) => !recipeTags.value.find((t) => t.tag === allT.tag)))
const currTag = ref('')
const currColor = ref(HSLToHexStr(newHSLPastel()))

function insertNewTag() {
  if (currTag.value === "") return
  
  const tagAlreadyExists = freeTags.value.find((t) => t.tag == currTag.value) ??
    recipeTags.value.find((t) => t.tag == currTag.value)

  if (tagAlreadyExists) {
    insertOldTag(tagAlreadyExists)
  }
  else {
    recipeTags.value.push({tag: currTag.value, color: currColor.value})
    currTag.value = ""
    currColor.value = HSLToHexStr(newHSLPastel())
  }
}

function insertOldTag(oldTag: Tag) {
  if (recipeTags.value.find((t) => t.tag == oldTag.tag)) return
  
  recipeTags.value.push(oldTag)
  currTag.value = ""
}

function deleteTag(tag: Tag) {
    const tagIdx = recipeTags.value.findIndex((t)=> t.tag === tag.tag)
    recipeTags.value.splice(tagIdx, 1)
}

</script>

<template>
  <div>
    <v-combobox
      clearable
      label="Write a new tag name or select an old one"
      :items="freeTags.map((t)=> t.tag)"
      v-model="currTag"
    ></v-combobox>
    <input type="color" id="tags" name="tags" v-model="currColor" />
    <button @click="insertNewTag">+</button>
  </div>
  <div>
    <v-chip v-for="tag in recipeTags" :color="tag.color" closable @click:close="deleteTag(tag)"
      variant="flat">
      {{ tag.tag }}
    </v-chip>
  </div>
</template>