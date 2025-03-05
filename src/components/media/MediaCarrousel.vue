<script setup lang="ts">
import type { Media } from '@/types/Media'
import { computed } from 'vue'

//TODO: ADD IMAGE FOOTER SUPPORT

const props = defineProps({
  id_start: String,
  media_list: Array<Media>
})


const selected = defineModel<number>('selected', { required: true  })

const id_start = props.id_start + '-'
const length = computed(() => {
  return props.media_list?.length || 0
})

function update_selected(new_sel: number) {
  selected.value = (new_sel + length.value) % length.value
}

const video_supp = ['mp4', 'ogg', 'webm']
</script>

<template>
  <div class="slider-wrapper">
    <a
      :href="'#' + id_start + selected"
      @click="update_selected(selected - 1)"
      class="arrows-a arrows-a-prev"
      v-if="length > 1"
    >
      <button class="arrows-btn">&lt;</button>
    </a>

    <a
      :href="'#' + id_start + selected"
      @click="update_selected(selected + 1)"
      class="arrows-a arrows-a-next"
      v-if="length > 1"
    >
      <button class="arrows-btn">&gt;</button>
    </a>

    <div class="slider">
      <li v-for="(item, index) in props.media_list" :key="index">
        <div
          v-if="!video_supp.includes(item.url?.split('.').pop() || '')"
          :id="id_start + index"
          class="slide"
          :style="'background-image: url(' + item.url + ');'"
        ></div>
        <div v-else :id="id_start + index" class="slide">
          <video :src="item.url" controls></video>
        </div>
      </li>
    </div>

    <div class="dots" v-if="length > 1">
      <li v-for="(_, index) in props.media_list" :key="index">
        <a
          :href="'#' + id_start + index"
          @click="update_selected(index)"
          :class="{ selected: selected === index }"
        ></a>
      </li>
    </div>
  </div>
</template>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  --carousel-inner-spacing: 2em;
}

body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px;
  background-image: linear-gradient(120deg, #f9f9f9, #f2f2f2);
  font-family: Tahoma, sans-serif;
}

.slider-wrapper {
  position: relative;
}

.slider {
  --slide-width: clamp(320px, 75vw, 800px);
  --slide-height: clamp(240px, 75vh, 600px);

  display: grid;
  grid-auto-flow: column;
  scroll-snap-type: x mandatory;
  max-width: var(--slide-width);
  border: 5px solid #fff;
  box-shadow:
    0 2px 15px rgba(#000, 0.2),
    0 2px 20px rgba(#000, 0.25);
  overflow-y: hidden;
  overflow-x: auto;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.slide {
  scroll-snap-align: start;
  width: var(--slide-width);
  height: var(--slide-height);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #999;
}

.dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  gap: 15px;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  a {
    --dots-size: 8px;
    display: inline-block;
    width: var(--dots-size);
    height: var(--dots-size);
    border-radius: 50%;
    background-color: #fff;
    opacity: 0.75;
    transition: transform 250ms;
    cursor: pointer;

    &:hover {
      transform: scale(1.5);
    }

    &.selected {
      opacity: 1;
      transform: scale(1.5);
    }
  }
}

.caption {
  display: block;
  margin-top: 25px;
  color: #999;
  letter-spacing: 0.5px;
}

.arrows-a {
  width: 3em;
  height: 3em;
  /*display: flex;
        align-items: center;
        justify-content: center;*/

  position: absolute;
  top: 50%;
  transform: translateY(-50%) - 1.5em;
  transition: transform 0.1s ease-in-out;
}

.arrows-btn {
  width: 100%;
  height: 100%;
  border: black;
  border-radius: 50%;
  cursor: pointer;
  color: green;
  background-color: white;
}

.arrows-a-prev {
  left: var(--carousel-inner-spacing);
}

.arrows-a-next {
  right: var(--carousel-inner-spacing);
}

.slide > div {
  height: 65%;
}

.slide > video {
  /*align: center;*/
  height: 100%;
  width: 100%;
  padding-left: auto;
  padding-right: auto;
  padding-bottom: 2.5em;
}

p {
  box-sizing: border-box;
  width: 100%;
  /*position: absolute;*/
  padding: 2em;
  left: 0;
  bottom: 0;
  top: auto;
  color: white;
  text-align: center;
}

li {
  list-style-type: none;
}
</style>
