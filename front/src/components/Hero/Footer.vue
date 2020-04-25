<template>
  <div class="flex flex-1 flex-col justify-end pb-10 mt-4 lg:mt-0">
    <p
      class="font-light text-gray-600 text-xxs font-semibold tracking-tight m-0 leading-tight mb-2"
    >
      Designed by:
    </p>
    <p class="text-xxs font-semibold tracking-tight m-0 leading-tight">
      {{ creator }}
    </p>
  </div>
</template>

<script>
export default {
  name: "ShowcaseFooter",
  props: {
    creator: {
      type: String,
      default: "Simple Serverless Webshop"
    }
  }
};
</script>
