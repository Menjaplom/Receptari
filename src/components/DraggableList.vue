<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
/*const props = defineProps({
  list: Array<string>
})*/
interface DragOver {
  item: string
  pos: number
  dir: string
}
const nullDragOver: DragOver = { item: '', pos: -1, dir: 'up' }
const items = ref(['one', 'two', 'three', 'four'])
const over: Ref<DragOver> = ref(nullDragOver)
const startLoc = ref(0)
const dragging = ref(false)
const dragFrom = ref({})

function startDrag(item, e) {
  startLoc.value = e.clientY
  dragging.value = true
  dragFrom.value = item
  console.log(dragFrom)
}

function finishDrag(item, pos) {
  items.value.splice(pos, 1)
  items.value.splice(over.value.pos, 0, item)
  over.value = nullDragOver
}

function onDragOver(item, pos, e) {
  const dir = startLoc.value < e.clientY ? 'down' : 'up'
  setTimeout(() => {
    over.value = { item: item, pos: pos, dir: dir }
  }, 50)
}
</script>

<template>
  <div class="list">
    <TransitionGroup name="flip-list" tag="div">
      <li
        @dragover="(e) => onDragOver(item, i, e)"
        @dragend="() => finishDrag(item, i)"
        @dragstart="(e) => startDrag(item, e)"
        v-for="(item, i) in items"
        class="item"
        :class="{
          over: item === over.item && item !== dragFrom,
          [over.dir]: item === over.item && item !== dragFrom
        }"
        draggable="true"
        :key="item"
      >
        {{ item }}
      </li>
    </TransitionGroup>
  </div>
</template>

<style>
.list > div {
  display: flex;
  flex-direction: column;
}

.item {
  width: 200px;
  padding: 10px;
  margin: 10px auto 10px 10px;
  background: tomato;
  color: white;
  font-family: sans-serif;
  border-radius: 5px;
  display: inline-block;
  /*   transition: opacity .3s ease-in-out; */
}

.flip-list-move {
  transition: transform 0.2s;
}

.over {
  opacity: 0.6;
}

.down {
  transform: translateY(-20px);
}

.up {
  transform: translateY(20px);
}
</style>
