import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/tailwind.css";
import "./assets/css/layout.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingCart,
  faCircle,
  faTimes,
  faLongArrowAltRight,
  faHome
} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText
} from "@fortawesome/vue-fontawesome";

library.add(faShoppingCart, faCircle, faTimes, faLongArrowAltRight, faHome);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("font-awesome-layers", FontAwesomeLayers);
Vue.component("font-awesome-layers-text", FontAwesomeLayersText);

Vue.config.productionTip = false;

// Load inventory
store.dispatch("getInventory");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
