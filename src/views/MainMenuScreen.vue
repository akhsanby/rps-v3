<template>
  <v-card class="rounded-xl" width="360">
    <v-card-text>
      <p class="text-h4 text-center text--primary font-weight-bold">Rock Paper Scissor</p>
      <p class="text-h6 text-center mt-n4">Long Short Term Memory</p>
    </v-card-text>
    <v-card-text class="text-center">
      <p class="text-h5 text--primary text-center font-weight-bold mt-n8">Main Menu</p>
      <div class="d-flex flex-column justify-center">

        <!-- dialog new game -->
        <v-dialog v-model="newGameDialog" width="200">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="#28b4e5" class="mx-10 mb-2 font-weight-black" large v-bind="attrs" v-on="on">
              New Game
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5 d-flex justify-center">
              Select level
            </v-card-title>
            <v-card-text class="d-flex flex-column justify-center">
              <v-btn @click="redirectToGamePage('easy')" class="font-weight-black" color="#28b4e5">Easy</v-btn>
              <v-btn @click="redirectToGamePage('medium')" class="font-weight-black my-2" color="#28b4e5">Medium</v-btn>
              <v-btn @click="redirectToGamePage('hard')" class="font-weight-black" color="#28b4e5">Hard</v-btn>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- end dialog new game -->

        <!-- dialog help -->
        <v-dialog v-model="helpDialog" max-width="800">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="#28b4e5" class="mx-10 mt-2 font-weight-black" large v-bind="attrs" v-on="on">
              Help
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h4 blue lighten-1">
              <span class="white--text">Help</span>
            </v-card-title>
            <v-card-text class="text-center">
              <p class="text-h4 text--primary font-weight-bold mt-5">Welcome to Game</p>
              <p class="text-h5 mt-n5">Rock Paper Scissor</p>
            </v-card-text>
            <v-card-text class="text-center">
              <p class="text-h5 text--primary font-weight-bold mt-n5">Can you reach 20 score in 30 seconds? This game has 3 different level, each level has been set with different abilities to predict</p>
              <p class="caption mt-n5">Tips : The game will defeat you, if you choose same pattern within period</p>
              <v-container>
              <v-row>
                <v-col class="d-flex justify-center">
                  <v-icon x-large>
                    fas fa-hand-rock
                  </v-icon>
                  <p class="font-weight-bold mx-3">defeat</p>
                  <v-icon x-large>
                    fas fa-hand-scissors
                  </v-icon>
                </v-col>

                <v-col class="d-flex justify-center">
                  <v-icon x-large>
                    fas fa-hand-paper
                  </v-icon>
                  <p class="font-weight-bold mx-3">defeat</p>
                  <v-icon x-large>
                    fas fa-hand-rock
                  </v-icon>
                </v-col>

                <v-col class="d-flex justify-center">
                  <v-icon x-large>
                    fas fa-hand-scissors
                  </v-icon>
                  <p class="font-weight-bold mx-3">defeat</p>
                  <v-icon x-large>
                    fas fa-hand-paper
                  </v-icon>
                </v-col>
              </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- end dialog help -->
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        newGameDialog: false,
        helpDialog: false,
      }
    },
    methods: {
      redirectToGamePage(level) {
        this.$router.push({ 
          name: 'game', 
          params: { 
            level
          } 
        })
      },
    }
  }
</script>