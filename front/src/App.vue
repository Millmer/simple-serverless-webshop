<template>
  <div class="min-h-screen">
    <Toast title="Toast" message="I'm a message" />
    <CartButton />
    <Nav />
    <div class="sm:px-10 px-4 pb-10 flex justify-center">
      <main class="w-fw">
        <router-view />
      </main>
    </div>
    <Footer />
  </div>
</template>
<script>
import Nav from "@/components/Nav";
import Toast from "@/components/Toast";
import CartButton from "@/components/CartButton";
import Footer from "@/components/Footer";

export default {
  name: "Base",
  components: {
    Nav,
    Toast,
    CartButton,
    Footer
  }
};
</script>
