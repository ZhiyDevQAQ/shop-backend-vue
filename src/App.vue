<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  mounted () {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault()
    })

    document.addEventListener('selectstart', function (e) {
      e.preventDefault()
    })

    document.addEventListener('keydown', function (e) {
      if (e && e.keyCode === 123) {
        // e.preventDefault()
      }
    })
  }
}
</script>

<style>

</style>
