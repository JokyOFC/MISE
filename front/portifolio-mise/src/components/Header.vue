<script setup lang="ts">
    import DecryptedText from './DecryptedText/DecryptedText.vue';
</script>

<template>

    <DecryptedText
        text="Hello World! Im trying to use Vue"
        :speed="70"
        :max-iterations="15"
        :sequential="true"
        reveal-direction="start"
        :use-original-chars-only="false"
        animate-on="hover"
        class-name="text-green-500"
        encrypted-class-name="text-red-500"
    />

</template>