<script lang="ts">
   import { HelloWorld } from "@admin/layout";
   export default {
      components: {
         HelloWorld,
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
   <HelloWorld msg="Vite + Vue Admin" />
   <button @click="goToAbout">Go to About</button>
</template>
