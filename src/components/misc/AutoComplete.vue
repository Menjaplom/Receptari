<script setup lang="ts">
import { computed, type Ref } from 'vue';

const props = defineProps<{
    inputStr: string,
    suggestionsArr: Array<string>
}>()

const emit = defineEmits<{
  suggestion: [suggestion: string]
}>()

const lowcSugArr = props.suggestionsArr.map((s) => s.toLowerCase())
const filteredSuggestions = computed(() => {
  console.log(props.suggestionsArr.filter((s) => s.startsWith(props.inputStr)))
  const lowcInput = props.inputStr.toLowerCase()
  return props.suggestionsArr.filter((_, idx) => lowcSugArr[idx].startsWith(lowcInput))
})

</script>

<template>
  <div class="autocomplete" v-if="inputStr && filteredSuggestions.length > 0">
    <ul class="autocomplete-results">
      <li class="autocomplete-result" v-for="suggestion in filteredSuggestions" @click="$emit('suggestion', suggestion)">
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>

<style>
  .autocomplete {
    position: relative;
  }

  .autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: 120px;
    min-height: 1em;
    max-height: 6em;    
    overflow: auto;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result:hover {
    background-color: #4AAE9B;
    color: white;
  }
</style>