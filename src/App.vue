<template>
  <div id="app">
    <router-view>
    </router-view>
  </div>
</template>
<script>
import router from './router/index';
export default {
  name: 'App',
  components: {
  },
  computed: {
    UserData() {
      return this.$store.getters["getUserData"];
    },
  },
  created() {
    this.$store.dispatch("getSkin");
    if (localStorage.getItem("loginToken") && !this.UserData.token) {
      const supportId = localStorage.getItem('supportId')
      if (supportId) {
        if (supportId !== router.currentRoute.query.supportId) {
          localStorage.setItem('supportId', router.currentRoute.query.supportId)
        }
      }
      this.$store.dispatch("login", { token: localStorage.getItem("loginToken") })
    }
  }
}
</script>

<style>
#app {
  font-family: sans-serif;
  font-weight: bolder;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
