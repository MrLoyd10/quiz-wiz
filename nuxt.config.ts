// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: true,
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  modules: ["@nuxt/ui", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  colorMode: {
    preference: "light",
  },
  css: ["@/assets/css/fonts.css"],
});
