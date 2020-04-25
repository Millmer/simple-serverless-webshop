<template>
  <div style="--aspect-ratio: 0.75;">
    <img class="object-cover object-center rounded-md" v-if="src" :src="src" />
  </div>
</template>

<script>
export default {
  name: "ProductImage",
  props: {
    src: {
      type: String
    }
  }
};
</script>

<style scoped>
[style*="--aspect-ratio"] > :first-child {
  width: 100%;
}
[style*="--aspect-ratio"] > img {
  height: auto;
}
@supports (--custom: property) {
  [style*="--aspect-ratio"] {
    position: relative;
  }
  [style*="--aspect-ratio"]::before {
    content: "";
    display: block;
    padding-bottom: calc(100% / (var(--aspect-ratio)));
  }
  [style*="--aspect-ratio"] > :first-child {
    position: absolute;
    top: -0.5rem;
    left: 0;
    height: 100%;
  }
}
</style>
