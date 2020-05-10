<template>
  <button
    v-bind="{...$props, ...$attrs}"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: String,
  },
}
</script>
