<template>
  <router-view />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background-color: var(--mise-bg);
  color: var(--mise-text);
}

::selection {
  background-color: var(--mise-selection-bg);
  color: var(--mise-selection-color);
}

::-moz-selection {
  background-color: var(--mise-selection-bg);
  color: var(--mise-selection-color);
}
</style>
