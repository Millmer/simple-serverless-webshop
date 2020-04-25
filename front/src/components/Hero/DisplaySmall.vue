<template>
  <div
    class="lg:w-flex-fourth bg-light px-6 pt-5 pb-2 lg:p-6 lg:pb-0 hover:bg-light-200 lg:mb-0 mb-4 overflow-hidden"
  >
    <router-link :to="`${link}`">
      <div class="flex flex-column justify-center items-center">
        <ProductImage :src="imageSrc" :alt="title" class="w-3/5 lg:w-2/3" />
      </div>
      <div>
        <p class="text-xl font-semibold mb-1">{{ title }}</p>
        <p v-if="subtitle" class="text-xs text-gray-700 mb-4">{{ subtitle }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
import ProductImage from "../ProductImage";

export default {
  name: "DisplaySmall",
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
