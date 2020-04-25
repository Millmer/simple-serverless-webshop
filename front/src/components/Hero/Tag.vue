<template>
  <div class="border-l border-gray-900 px-3 mb-10">
    <p class="text-xxs font-semibold tracking-tight m-0 leading-tight">
      {{ category }}
    </p>
    <p
      v-if="year"
      class="text-xxs font-semibold tracking-tight m-0 leading-tight"
    >
      {{ year }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Tag",
  props: {
    category: {
      type: String,
      required: true
    },
    year: {
      type: String
    }
  }
};
</script>
