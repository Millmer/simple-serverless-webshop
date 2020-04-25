<template>
  <div v-if="Object.keys(categories).length" class="flex flex-col items-center">
    <div class="min-w-full flex flex-col">
      <div class="pt-10 pb-8">
        <h1 class="text-5xl font-light">{{ categories[slug] }}</h1>
      </div>
      <div
        class="flex flex-1 flex-wrap flex-row justify-evenly md:justify-between items-center md:items-stretch"
      >
        <ListItem
          v-for="(item, index) in inventoryForSluggedCategory(slug)"
          :key="index"
          :link="`/products/${item.id}`"
          :title="item.name"
          :price="item.price"
          :imageSrc="item.image"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import ListItem from "@/components/ListItem";

export default {
  name: "Category",
  components: {
    ListItem
  },
  computed: {
    slug() {
      return this.$route.params.id;
    },
    ...mapState(["categories"]),
    ...mapGetters(["inventoryForSluggedCategory"])
  }
};
</script>
