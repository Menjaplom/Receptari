<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  itemClass: {
    type: String,
    default: ''
  },
  item: {
    type: Object,
    default: () => {
      return {}
    }
  },
  headers: {
    type: Array,
    default: () => {
      return []
    }
  }
})

const getClass = computed(() => {
  return props.itemClass
})

let columnName = (header) => {
  return `item.${header.value}`
}
let getAlignment = (header) => {
  const align = header.align ? header.align : 'right'
  return `text-align: ${align}`
}
let getNonSlotValue = (item, header) => {
  const val = item[header.value]

  if (val) {
    return val
  }

  return ''
}
</script>

<template>
  <tr :class="getClass">
    <td v-for="(header, index) in headers" :key="index">
      <slot :item="item" :name="columnName(header)">
        <div :style="getAlignment(header)">
          {{ getNonSlotValue(item, header) }}
        </div>
      </slot>
    </td>
  </tr>
</template>
