<template>
  <div v-if="inventory.length">
    <div class="w-full">
      <div
        class="bg-pink-200 lg:h-hero p-6 pb-10 sm:pb-6 flex lg:flex-row flex-col"
      >
        <div class="pt-4 pl-2 sm:pt-12 sm:pl-12 flex flex-1 flex-col">
          <Tag
            year="2020"
            :category="titleIfy(getShowcaseItem.categories[0])"
          />
          <Center
            :price="getShowcaseItem.price"
            :title="getShowcaseItem.name"
            :link="`/products/${getShowcaseItem.id}`"
            class="pb-10"
          />
          <Footer creator="Simple Serverless Webshop" />
        </div>
        <div
          class="flex flex-1 justify-center items-center relative overflow-hidden"
        >
          <Showcase :imageSrc="getShowcaseItem.image" />
          <div
            class="absolute w-48 h-48 sm:w-72 sm:h-72 xl:w-88 xl:h-88 bg-white z-0 rounded-full"
          />
        </div>
      </div>
    </div>
    <div class="pt-10 pb-6 flex flex-col items-center">
      <h2 class="text-4xl mb-3">Who Are We?</h2>
      <p class="text-gray-600 text-sm m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut odio
        facilis officiis ullam mollitia maiores aliquid, fugiat explicabo animi
        numquam sit corporis quidem sapiente. Vero doloribus culpa expedita ea
        excepturi! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Tenetur provident perspiciatis totam similique dolorum? Illo, qui
        repellat a, libero praesentium non perferendis impedit nihil adipisci
        odio expedita veniam placeat ipsum.
      </p>
    </div>
    <div class="my-4 lg:my-8 flex flex-col lg:flex-row justify-between">
      <DisplayMedium
        v-for="(item, index) in getTopCategories"
        :key="`categories-${index}`"
        :imageSrc="item.image"
        subtitle="In Stock!"
        :title="categories[slugify(item.categories[0])]"
        :link="`/categories/${slugify(item.categories[0])}`"
      />
    </div>
    <div class="pt-10 pb-6 flex flex-col items-center">
      <h2 class="text-4xl mb-3">Trending Now</h2>
      <p class="text-gray-600 text-sm">
        Find the perfect scent to finish off your favorite room in the house.
      </p>
    </div>
    <div class="my-8 flex flex-col lg:flex-row justify-between">
      <DisplaySmall
        v-for="(item, index) in getTrendingItems"
        :key="`trending-${index}`"
        :imageSrc="item.image"
        :title="item.name"
        :subtitle="titleIfy(item.categories[0])"
        :link="`/products/${item.id}`"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { slugify, titleIfy } from "../utils/helpers";

import Tag from "@/components/Hero/Tag";
import Center from "@/components/Hero/Center";
import Footer from "@/components/Hero/Footer";
import Showcase from "@/components/Hero/Showcase";

import DisplayMedium from "@/components/Hero/DisplayMedium";
import DisplaySmall from "@/components/Hero/DisplaySmall";

export default {
  name: "Home",
  components: {
    Tag,
    Center,
    Footer,
    Showcase,
    DisplayMedium,
    DisplaySmall
  },
  methods: {
    slugify,
    titleIfy
  },
  computed: {
    ...mapState(["inventory", "categories"]),
    ...mapGetters(["getShowcaseItem", "getTopCategories", "getTrendingItems"])
  }
};
</script>
