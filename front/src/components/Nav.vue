<template>
  <nav>
    <div class="flex justify-center">
      <div class="w-fw px-10 px-4 pt-10 pb-6 flex flex-col sm:flex-row">
        <router-link class="m-0" to="/">
          <img
            class="mb-1 w-46 sm:w-96 sm:mr-10"
            alt="Logo"
            aria-label="Logo"
            src="../assets/logo.png"
          />
        </router-link>
        <div class="flex flex-wrap justify-center items-center">
          <router-link
            v-for="(link, i) in links"
            :to="link.path"
            exact
            :key="i"
            :aria-label="link.name || link.icon"
            class="mt-2 mr-2 border-black border-2 hover:bg-black hover:text-white"
            nav
          >
            <p
              :key="i"
              v-if="link.name"
              class="p-2 m-0 text-smaller font-semibold"
            >
              {{ link.name }}
            </p>
            <p :key="i" v-else class="p-2 m-0 text-smaller font-semibold">
              <font-awesome-icon :icon="['fas', link.icon]" />
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  computed: {
    links() {
      const links = [];
      const sluggedCategories = Object.keys(this.$store.state.categories);

      // Move all to end
      const allIndex = sluggedCategories.indexOf("all");
      if (allIndex >= 0)
        sluggedCategories.splice(
          sluggedCategories.length - 1,
          0,
          sluggedCategories.splice(allIndex, 1)[0]
        );

      // Move new-arrivals to start
      const newArrivalsIndex = sluggedCategories.indexOf("new-arrivals");
      if (newArrivalsIndex >= 0)
        sluggedCategories.splice(
          0,
          0,
          sluggedCategories.splice(newArrivalsIndex, 1)[0]
        );

      // Move on-sale to start
      const onSaleIndex = sluggedCategories.indexOf("on-sale");
      if (onSaleIndex >= 0)
        sluggedCategories.splice(
          0,
          0,
          sluggedCategories.splice(onSaleIndex, 1)[0]
        );

      sluggedCategories.forEach(sluggedCategory => {
        links.push({
          name: this.$store.state.categories[sluggedCategory],
          path: `/categories/${sluggedCategory}`
        });
      });

      // Add home link at end of nav
      links.push({
        icon: "home",
        path: "/"
      });

      return links;
    }
  }
};
</script>

<style scoped>
.router-link-active[nav] {
  background-color: black;
  color: white;
}
</style>
