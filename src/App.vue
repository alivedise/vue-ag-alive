<template>
  <v-app>
    <v-app-bar
      app
      dark
    >
      <h3 class="d-flex align-center">
        機動戰姬裝備計算器
      </h3>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/alivedise/vue-ag-alive"
        target="_blank"
        text
      >
        <span class="mr-2">v0.0.1 build-{{buildID}}</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <v-footer>
      <v-col
        class="text-center"
        cols="12"
      >
        <h5>The copyright of the data used on this site is owned by the following companies</h5>
        </h5>©Access!.</h5>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    window.app = this;
    setTimeout(() => {
      if (window.location.hash === '#/') {
        this.$router.push('/revive');
      }
    }, 1000);
  },
  computed: {
    buildID() {
      return process.env.VUE_APP_GIT_HASH;
    },
  },
};
</script>
