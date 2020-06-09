import Vue from "vue";
import Vuex from "vuex";
import { DENOMINATION, getInventory } from "../providers/inventoryProvider";
import { slugify, titleIfy } from "../utils/helpers";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    denomination: DENOMINATION,
    inventory: [],
    categories: {},
    cart: [],
    alerts: []
  },
  mutations: {
    setInventory(state, payload) {
      state.inventory = payload;
      const categories = {};
      payload.forEach(item => {
        item.categories.forEach(category => {
          const slugged = slugify(category);
          if (!Object.prototype.hasOwnProperty.call(categories, slugged))
            categories[slugged] = titleIfy(category);
        });
      });
      state.categories = categories;
    },
    addToCart(state, payload) {
      let found = false;
      for (let i = 0; i < state.cart.length; i++) {
        const item = state.cart[i];
        if (item.id === payload.id) {
          item.quantity += 1;
          found = true;
          break;
        }
      }
      if (!found) state.cart.push({ ...payload, quantity: 1 });
    },
    removeFromCart(state, payload) {
      state.cart = state.cart.filter(item => item.id !== payload.id);
    },
    setAlert(state, payload) {
      state.alerts.push(payload);
    },
    removeAlert(state, payload) {
      const index = state.alerts.indexOf(payload);
      if (index >= 0) state.alerts.splice(index, 1);
    },
    resetAlerts(state) {
      state.alerts = [];
    }
  },
  actions: {
    async getInventory({ commit }) {
      commit("setInventory", await getInventory());
    },
    async addItemToCart({ commit, dispatch }, item) {
      commit("addToCart", item);
      dispatch("setAlert", {
        title: "Added to Cart!",
        message: `Product ${item.name} was added to the cart`
      });
    },
    async removeItemFromCart({ commit }, item) {
      commit("removeFromCart", item);
    },
    setAlert({ commit }, payload) {
      commit("setAlert", payload);
      setTimeout(() => commit("removeAlert", payload), 3000);
    }
  },
  getters: {
    getItemById: state => id =>
      state.inventory.find(item => item.id === id) || {},
    getShowcaseItem: state => {
      const showcase = state.inventory.find(item => item.tag === "showcase");
      return showcase || state.inventory[0];
    },
    getTopCategories: state => {
      const first =
        state.inventory.find(item => item.categories.includes("soy")) ||
        state.inventory[0];
      const second =
        state.inventory.find(item => item.categories.includes("scented")) ||
        state.inventory[state.inventory.length - 1];
      return [first, second];
    },
    getTrendingItems: state => {
      let trending = state.inventory.filter(item => item.tag === "trending");
      const maxLength = Math.min(4, state.inventory.length);
      if (trending.length < maxLength) {
        const trendingIds = trending.map(item => item.id);
        const remainingItems = state.inventory.filter(
          item => !trendingIds.includes(item.id)
        );
        const missingAmount = maxLength - trending.length;
        trending = [...trending, ...remainingItems.slice(0, missingAmount)];
      }
      return trending;
    },
    inventoryForSluggedCategory: state => slug => {
      return state.inventory.filter(item => {
        for (let i = 0; i < item.categories.length; i++) {
          const category = slugify(item.categories[i]);
          if (slug === category) return true;
        }
        return false;
      });
    },
    numberOfItemsInCart: state =>
      state.cart.reduce((total, item) => (total += parseInt(item.quantity)), 0),
    cartTotal: state => {
      let tot = state.cart.reduce(
        (total, item) =>
          (total += parseFloat(item.price) * parseInt(item.quantity)),
        0
      );
      return Math.round((tot + Number.EPSILON) * 100) / 100;
    },
    stripeItems: state => {
      return state.cart.map(item => {
        return { price: `price_${item.id}`, quantity: item.quantity };
      });
    }
  },
  modules: {}
});
