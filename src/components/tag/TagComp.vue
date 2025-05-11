<script setup lang="ts">
import { type Tag } from '@/types/Tag';

const props = defineProps<{ tag: Tag }>()
console.log('TagComp '+ JSON.stringify(props.tag))
</script>

<template>
    <span :style="{backgroundColor: tag.color}">{{tag.tag}}</span> 
    <slot></slot>
</template>