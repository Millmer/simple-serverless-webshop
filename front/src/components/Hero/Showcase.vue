<template>
  <div class="z-10">
    <img
      class="w-136 max-h-104 object-cover object-center rounded-sm"
      v-if="imageSrc"
      :src="imageSrc"
      alt="Showcase item"
    />
  </div>
</template>

<script>
export default {
  name: "Showcase",
  props: {
    imageSrc: {
      type: String,
      required: true
    }
  }
};
</script>
