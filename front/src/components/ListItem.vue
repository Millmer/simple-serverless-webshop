<template>
  <div class="w-full md:w-1/2 h-96 lg:w-1/4 p-1 mb-4 sm:p-2">
    <router-link :to="link">
      <div
        class="flex justify-center items-center bg-light hover:bg-light-200 rounded-sm overflow-hidden"
      >
        <div
          class="mt-5 max-h-72 flex flex-column justify-center items-center w-3/4"
        >
          <ProductImage :alt="title" :src="imageSrc" class="w-3/4 md:w-2/3" />
        </div>
      </div>
    </router-link>
    <div>
      <p class="mt-4 mb-1 text-center text-l font-semibold">{{ title }}</p>
      <p class="text-center text-xs text-gray-700 mb-4">
        {{ `${denomination}${price}` }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import ProductImage from "./ProductImage";

export default {
  name: "ListItem",
  components: {
    ProductImage
  },
  props: ["link", "imageSrc", "price", "title"],
  computed: {
    ...mapState(["denomination"])
  }
};
</script>
