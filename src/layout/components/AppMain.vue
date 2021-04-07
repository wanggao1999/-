<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 85px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background: #f0f2f5;
  box-shadow: 0 1px 4px rgba(151, 167, 182, 0.08);
  /* padding: 10px; */
}
.fixed-header+.app-main {
  padding-top: 84px;
}
</style>

<style lang="scss">

</style>
