<template>
  <div>
    {{ id }}
  </div>
</template>

<script>
export default {
  name: 'edit-book',
  props: {
    id: {
      type: String,
      required: true
    }
  }
}
</script>