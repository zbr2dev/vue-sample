<template>
    <svg :width="width" :height="height" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.5147 2.42919C9.71689 2.227 9.71689 1.89001 9.5147 1.69818L8.30153 0.48502C8.10971 0.282825 7.77272 0.282825 7.57052 0.48502L6.61658 1.43378L8.56076 3.37795L9.5147 2.42919ZM0.333008 7.72253V9.66671H2.27718L8.0112 3.92751L6.06703 1.98333L0.333008 7.72253Z" fill="#333333"/>
    </svg>
</template>

<script>
export default {
  name: 'DoneIcon',
  props: {
    width: {
      type: Number,
      default: 10,
    },
    height: {
      type: Number,
      default: 10,
    },
  },
};
</script>

<style scoped>

</style>
