<template>
  <div class="fixed top-49 right-20 xxl:right-flexiblemargin z-10">
    <div class="flex flex-1 justify-end pr-4 relative">
      <router-link to="/cart">
        <font-awesome-layers full-width class="fa-lg">
          <font-awesome-icon :icon="['fas', 'shopping-cart']" />
          <font-awesome-layers-text
            v-if="numberOfItemsInCart > 0"
            counter
            :value="numberOfItemsInCart"
            transform="down-6 shrink-8 right-20"
          />
        </font-awesome-layers>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartButton",
  computed: mapGetters(["numberOfItemsInCart"])
};
</script>

<style scoped>
.fa-shopping-cart:hover {
  color: #ccc;
}
</style>
