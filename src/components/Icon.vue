<template>
    <svg viewBox="0 0 24 24">
        <path fill="currentColor" :d="d" />
    </svg>
</template>

<script>
export default {
    name: 'IconMdi',
    props: {
        d: String
    }
}
</script>
  