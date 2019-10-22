<template>
  <q-page>

    <div class="row">
      <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">.col-md-6 .offset-md-3</div>
    </div>

  </q-page>
</template>

<script>
export default {
  name: 'layout'
}
</script>

<style lang="sass" scoped>
.row
  background: rgba(255,0,0,.1)
.row > div
  padding: 10px 15px
  background: rgba(86,61,124,.15)
  border: 1px solid rgba(86,61,124,.2)
.row + .row
  margin-top: 1rem
.medium
  min-width: 400px
</style>