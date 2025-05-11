<script setup lang="ts">
import { dbLit } from '@/literals';
import type { DBConnection } from '@/services/database/dbInterface';
import type { Tag } from '@/types/Tag';
import { HSLToHexStr, newHSLPastel } from '@/utils/colors';
import { emit } from 'process';
import { inject, ref, type Ref } from 'vue';
import TagComp from '../tag/TagComp.vue';
import AutoComplete from '../misc/AutoComplete.vue';

let newTags = defineModel<Array<Tag>>('newTags', { required: true })
/*const props = defineProps<{
    newTags:  Array<Tag>
}>()
let newTags = ref(props.newTags)*/

//defineEmits<{(e: 'updateTags', id: Tag[]): void}>()
const db: Ref<DBConnection> = inject(dbLit) as Ref<DBConnection>
const tagSugestionList = await db.value.getAllTags()
const tagSugNameList = tagSugestionList.map((sug) => sug.tag)

const currTag = ref('')
const currColor = ref(HSLToHexStr(newHSLPastel()))

function insertNewTag() {
    newTags.value.push({tag: currTag.value, color: currColor.value})
    currTag.value = ""
    currColor.value = HSLToHexStr(newHSLPastel())
}

function insertOldTag(tagName: string) {
  console.log('clicked tagname = '+ tagName)
  const oldTag = tagSugestionList.find((t) => t.tag == tagName)
  newTags.value.push(oldTag!)
  currTag.value = ""
}

function deleteTag(tagIdx: number) {
    newTags.value.splice(tagIdx, 1)
}

let edit = -1
function editTag(idx: number) {
  if (edit === idx) {
    edit = -1
    currTag.value = ""
    currColor.value = HSLToHexStr(newHSLPastel())
  }
  else {
    edit = idx
    currTag.value = newTags.value[idx].tag
    currColor.value = newTags.value[idx].color
  }
}

</script>

<template>
  <div>
    <h3>Tags</h3>
    <div>
      <input type="text" id="tags" name="tags" v-model="currTag" v-on:keyup.enter="insertNewTag" />
      <input type="color" id="tags" name="tags" v-model="currColor" /> 
      <button @click="insertNewTag">+</button>
      <AutoComplete :inputStr="currTag" :suggestionsArr="tagSugNameList" @suggestion="insertOldTag"/>
    </div>
    <div>
      <span v-for="(tag, idx) in newTags" :style="{backgroundColor: tag.color}">
        <TagComp :tag="tag">
          <button @click="deleteTag(idx)">X</button>
        </TagComp>
      </span> 
    </div>
  </div>
</template>