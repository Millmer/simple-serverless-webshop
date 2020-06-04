<template>
  <div class="py-12 flex flex-1 flex-col md:flex-row w-full my-0 mx-auto">
    <div class="w-full md:w-1/2 flex flex-1 justify-center">
      <div class="w-full">
        <div
          class="py-16 p10 flex flex-1 justify-center items-center bg-light hover:bg-light-200"
        >
          <ProductImage
            :src="item.image"
            class="m-0 w-3/4 md:w-2/5"
            :alt="item.name"
          />
        </div>
        <div class="flex flex-col justify-center items-center hidden sm:block">
          <p class="text-gray-600 text-sm pt-5">
            {{ noteText }}
          </p>
        </div>
      </div>
    </div>
    <div class="pt-2 px-0 md:px-10 pb-8 w-full md:w-1/2">
      <h1 class="text-2xl md:text-5xl font-light">{{ item.name }}</h1>
      <h2 class="text-2xl tracking-tighter">
        {{ denomination }}{{ item.price }}
      </h2>
      <p class="text-gray-600 text-sm">{{ item.description }}</p>
      <p class="text-gray-600 text-sm">
        {{ shippingText }}
      </p>
      <ActionButton full title="Add to Cart" :onClick="addItemToCart" />
      <p class="text-gray-600 text-sm pt-5">
        {{ generalProductInfoText }}
      </p>
      <p class="text-gray-600 text-sm block sm:hidden">
        {{ noteText }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import ProductImage from "@/components/ProductImage";
import ActionButton from "@/components/ActionButton";

export default {
  name: "Product",
  components: {
    ProductImage,
    ActionButton
  },
  created() {
    this.item = this.getItemById(this.$route.params.id);
  },
  data() {
    return {
      item: {},
      noteText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias adipisci ipsum facilis laudantium necessitatibus a reprehenderit laboriosam nihil asperiores ipsa corrupti, ducimus illum provident officia, temporibus, tempora error eaque autem.",
      generalProductInfoText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias adipisci ipsum facilis laudantium necessitatibus a reprehenderit laboriosam nihil asperiores ipsa corrupti, ducimus illum provident officia, temporibus, tempora error eaque autem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias adipisci ipsum facilis laudantium necessitatibus a reprehenderit laboriosam nihil asperiores ipsa corrupti, ducimus illum provident officia, temporibus, tempora error eaque autem.",
      shippingText: "Free Shipping on all purchases via Royal Mail 2nd Class."
    };
  },
  methods: {
    addItemToCart() {
      this.$store.dispatch("addItemToCart", this.item);
    }
  },
  computed: {
    ...mapState(["inventory", "denomination"]),
    ...mapGetters(["getItemById"])
  },
  watch: {
    inventory() {
      this.item = this.getItemById(this.$route.params.id);
    },
    $route(to) {
      this.item = this.getItemById(to.params.id);
    }
  }
};
</script>
