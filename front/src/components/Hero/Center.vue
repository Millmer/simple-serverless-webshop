<template>
  <div>
    <p class="text-3xl xl:text-4xl font-bold tracking-widest leading-none">
      {{ title }}
    </p>
    <p>
      PRICE: <span>{{ denomination }}{{ price }}</span>
    </p>
    <ActionButton
      title="Buy Now"
      :onClick="() => this.$router.push({ path: this.link })"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ActionButton from "../ActionButton";

export default {
  name: "Center",
  components: {
    ActionButton
  },
  props: {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  },
  computed: mapState(["denomination"])
};
</script>
