<template>
  <footer class="flex justify-center">
    <div
      class="flex w-fw px-8 px-0 border-solid border-t border-gray-300 items-center"
    >
      <span class="block text-gray-700 pt-4 pb-8 mt-2 text-xs"
        >Copyright © 2020
        <a target="_blank" rel="noopener" href="https://developyn.com"
          >Developyn</a
        >. All rights reserved.</span
      >
      <div class="flex flex-1 justify-end">
        <router-link to="/admin">
          <p class="pt-4 text-xs">Admins</p>
        </router-link>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>
