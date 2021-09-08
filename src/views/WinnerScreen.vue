<template>
	<v-card class="rounded-xl" max-width="400">
    <v-card-text class="text-center">
      <p class="text-h4 text-center text--primary font-weight-bold">{{ textWinner }}</p>
      <v-btn class="mr-1" x-small color="secondary" dark :to="{path: '/'}">
        Back to Main Menu
      </v-btn>
      <v-btn class="ml-1" x-small color="secondary" dark :to="{path: '/game'}">
        Try again
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
  import JSConfetti from 'js-confetti'
  const jsConfetti = new JSConfetti()

  export default {
    data() {
      return {
        scorePlayer: this.$route.params.scorePlayer,
        textWinner: this.$route.params.finalWinner,
        resetGame: this.$route.params.resetGame
      }
    },
    created() {
      if (this.scorePlayer >= 20) {
        let x = 0;
        let intervalID = setInterval(function () {
          jsConfetti.addConfetti()
          if (++x === 3) {
            window.clearInterval(intervalID);
          }
        }, 2000);
      }
    }
  }
</script>