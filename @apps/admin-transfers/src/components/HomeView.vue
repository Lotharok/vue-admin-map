<script lang="ts">
   export default {
      components: {
      },
      methods: {
         goToAbout() {
            this.$router.push("/about");
         },
      },
   };
</script>

<template>
   <H1>HOME ADMIN Transfer</H1>
   <button @click="goToAbout">Go to About</button>
</template>
