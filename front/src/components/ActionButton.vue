<template>
  <button @click="onClick" :class="actionClass">
    <div>{{ title }}</div>
  </button>
</template>

<script>
export default {
  name: "ActionButton",
  props: {
    onClick: {
      type: Function,
      required: true
    },
    title: {
      type: String,
      default: "Click Here"
    },
    full: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const classNames =
      "text-sm font-bold tracking-wider bg-transparent hover:bg-black text-black font-semibold hover:text-white py-4 px-12 border-2 border-black hover:border-transparent";
    return {
      actionClass: this.full ? `${classNames} w-full` : classNames
    };
  }
};
</script>
