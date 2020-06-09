<template>
  <div class="flex flex-col items-center pb-10">
    <div class="flex flex-col w-full xl:w-large">
      <div class="pt-10 pb-8">
        <h1 class="text-5xl font-light">Your Cart</h1>
      </div>
      <h3 v-if="numberOfItemsInCart <= 0">No items in cart.</h3>
      <div v-else class="flex flex-col">
        <div>
          <div v-for="item in cart" class="border-b py-10" :key="item.id">
            <div class="flex items-center">
              <router-link :to="`/products/${item.id}`">
                <ProductImage
                  class="w-32 m-0"
                  :src="item.image"
                  :alt="item.name"
                />
              </router-link>
              <router-link :to="`/products/${item.id}`">
                <p class="m-0 pl-10 text-gray-600 text-sm">
                  {{ item.name }}
                </p>
              </router-link>
              <div class="flex flex-1 justify-end">
                <p
                  class="m-0 pl-10 text-gray-900 tracking-tighter font-semibold"
                >
                  {{ `${item.quantity} x ${denomination}${item.price}` }}
                </p>
              </div>
              <div
                role="button"
                @click="removeFromCart(item)"
                class="m-0 ml-10 text-gray-900 text-s cursor-pointer"
              >
                <font-awesome-icon :icon="['fas', 'times']" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ml-4 pl-2 flex flex-1 justify-end pt-2 md:pt-8 pr-4">
        <p class="text-sm pr-10">Subtotal</p>
        <p class="tracking-tighter w-38 flex justify-end">
          {{ `${denomination}${cartTotal}` }}
        </p>
      </div>
      <div class="ml-4 pl-2 flex flex-1 justify-end pr-4">
        <p class="text-sm pr-10">Shipping</p>
        <p class="tracking-tighter w-38 flex justify-end">
          FREE SHIPPING*
        </p>
      </div>
      <div class="md:ml-4 pl-2 flex flex-1 justify-end bg-gray-200 pr-4 pt-6">
        <p class="text-sm pr-10">Total</p>
        <p class="font-semibold tracking-tighter w-38 flex justify-end">
          {{ `${denomination}${cartTotal + calculateShipping()}` }}
        </p>
      </div>
      <div class="md:ml-4 pl-2 pr-4 pt-6 flex flex-row">
        <p class="mr-4 sm:ml-0 flex flex-1 justify-start text-gray-600 text-sm">
          *Free Shipping on all purchases via Royal Mail 2nd Class.
        </p>
        <div
          v-if="numberOfItemsInCart > 0 && !loading"
          @click="redirectToCheckout"
          class="flex flex-1 justify-end"
        >
          <div class="cursor-pointer flex">
            <p class="text-gray-600 text-sm mr-0 sm:mr-2">
              Proceed to check out
            </p>
            <font-awesome-icon
              class="text-gray-600 mt-1"
              :icon="['fas', 'long-arrow-alt-right']"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const stripe = Stripe(process.env.VUE_APP_STRIPE_PUBLIC_KEY); //eslint-disable-line no-undef
import { mapState, mapGetters } from "vuex";

import ProductImage from "@/components/ProductImage";

export default {
  name: "Cart",
  components: {
    ProductImage
  },
  data: () => ({
    loading: false,
    successUrl: `${process.env.VUE_APP_STRIPE_REDIRECT_URL}/success`,
    cancelUrl: `${process.env.VUE_APP_STRIPE_REDIRECT_URL}/cancelled`
  }),
  methods: {
    removeFromCart(item) {
      this.$store.dispatch("removeItemFromCart", item);
    },
    calculateShipping() {
      return 0;
    },
    async redirectToCheckout() {
      this.loading = true;
      try {
        const { error } = await stripe.redirectToCheckout({
          lineItems: this.stripeItems,
          mode: "payment",
          successUrl: this.successUrl,
          cancelUrl: this.cancelUrl,
          shippingAddressCollection: {
            allowedCountries: ["GB"]
          }
        });
        this.loading = false;
        if (error) alert(error);
      } catch (error) {
        console.error(error);
        this.loading = false;
        alert(error);
      }
    }
  },
  computed: {
    ...mapState(["cart", "denomination"]),
    ...mapGetters(["numberOfItemsInCart", "cartTotal", "stripeItems"])
  }
};
</script>
