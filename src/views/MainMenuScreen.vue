<template>
  <v-card class="rounded-xl" width="360">
    <v-card-text>
      <p class="text-h4 text-center text--primary font-weight-bold">Rock Paper Scissor</p>
      <p class="text-h6 text-center mt-n4">Long Short Term Memory</p>
    </v-card-text>
    <v-card-text>
      <p class="text-h5 text--primary text-center font-weight-bold mt-n8">Main Menu</p>
      <div class="d-flex flex-column justify-center">
        <v-btn :to="{path: '/game'}" class="mx-10 font-weight-black" color="#28b4e5" large>Enter Game</v-btn>
        <v-btn :to="{path: '/help'}" class="my-2 mx-10 font-weight-black" color="#28b4e5" large>Help</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>