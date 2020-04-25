<template>
  <div
    class="lg:w-flex-half mb-4 lg:mb-0 bg-light p-8 pb-0 hover:bg-light-200 overflow-hidden"
  >
    <router-link :to="`${link}`">
      <div class="flex flex-column justify-center items-center">
        <ProductImage :src="imageSrc" :alt="title" class="w-3/5 max-h-60" />
      </div>
      <div>
        <p class="text-3xl font-semibold mb-1">{{ title }}</p>
        <p v-if="subtitle" class="text-xs text-gray-700 mb-4">{{ subtitle }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
import ProductImage from "../ProductImage";

export default {
  name: "DisplayMedium",
  components: {
    ProductImage
  },
  props: {
    imageSrc: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String
    },
    link: {
      type: String,
      required: true
    }
  }
};
</script>
