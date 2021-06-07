<template>
  <section id="hero">
    <v-img
      :min-height="minHeight"
      :src="require('@/assets/hero-admin.jpg')"
      class="white--text"
      gradient="to bottom, rgba(11, 28, 61, .9), rgba(0,0,0,.4)"
    >
      <v-container class="fill-height px-4 py-2">
        <v-responsive
          class="d-flex align-center mx-auto"
          height="100%"
          max-width="700"
          width="100%"
        >
          <h3 class="display-2 mb-4">
            Welcome....
          </h3>
          <h1
            :class="$vuetify.breakpoint.smAndDown ? 'display-2' : 'display-4'"
          >
            <u><strong>K-Admin!</strong></u>
          </h1>
          <div
            :class="
              $vuetify.breakpoint.smAndDown
                ? 'flex-column align-'
                : 'align-left'
            "
            class="d-flex flex-wrap"
          ></div>
        </v-responsive>
      </v-container>
    </v-img>
  </section>
</template>

<script>
export default {
  name: 'SectionHero',

  provide: {
    theme: { isDark: true },
  },

  computed: {
    minHeight() {
      const height = this.$vuetify.breakpoint.mdAndUp ? '100vh' : '50vh'

      return `calc(${height} - ${this.$vuetify.application.top}px)`
    },
  },
}
</script>
