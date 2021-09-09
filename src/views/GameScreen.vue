<template>
    <v-card class="rounded-xl" elevation="8" max-width="400">
      <v-card-title class="blue lighten-1">
        <span class="text-h4 white--text text-center font-weight-bold text-capitalize">
          {{ gameLevel }} level selected
        </span>
      </v-card-title>
      <v-card-text class="text-center pt-4">
        <span class="text-h4 font-weight-bold text--primary">Score</span>
        <p class="text-h6 font-weight-bold mt-n2">
          {{ countDown }} {{ countDown <= 1 ? 'second' : 'seconds' }}
        </p>
        <v-row class="text-center mt-n5">
          <v-col cols="5" offset="1">
            <p class="text-h3 text--primary">{{ scorePlayer }}</p>
            <p class="text-h5 text--primary mt-n3">Player</p>
            <div class="d-flex flex-row justify-center mt-n3">
              <v-icon large v-if="this.chosenByPlayer === 1">
                fas fa-hand-rock
              </v-icon>
              <v-icon large v-else-if="this.chosenByPlayer === 2">
                fas fa-hand-paper
              </v-icon>
              <v-icon large v-else-if="this.chosenByPlayer === 3">
                fas fa-hand-scissors fa-flip-horizontal
              </v-icon>
            </div>
          </v-col>
          <v-col cols="5">
            <p class="text-h3 text--primary">{{ scoreEnemy }}</p>
            <p class="text-h5 text--primary mt-n3">Enemy</p>
            <div class="d-flex flex-row justify-center mt-n3">
              <v-icon large v-if="this.chosenByEnemy === 1">
                fas fa-hand-rock
              </v-icon>
              <v-icon large v-else-if="this.chosenByEnemy === 2">
                fas fa-hand-paper
              </v-icon>
              <v-icon large v-else-if="this.chosenByEnemy === 3">
                fas fa-hand-scissors  
              </v-icon>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="text-center mt-n5">
        <p v-if="this.winner === 'player'" class="text-h5 text--primary font-weight-bold">Player win</p>
        <p v-else-if="this.winner === 'enemy'" class="text-h5 text--primary font-weight-bold">Enemy win</p>
        <p v-else-if="this.winner === 'draw'" class="text-h5 text--primary font-weight-bold">Draw</p>
        <p v-else class="text-h5 font-weight-bold text--primary">Choose one to start</p>
      </v-card-text>
      <div class="d-flex flex-row justify-center mt-n5">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mx-2" fab dark x-large color="#28b4e5" v-bind="attrs" v-on="on" @click="playerInput(1)">
              <v-icon dark x-large>
                far fa-hand-rock
              </v-icon>
            </v-btn>
          </template>
          <span>Rock</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mx-2" fab dark x-large color="#28b4e5" v-bind="attrs" v-on="on" @click="playerInput(2)">
              <v-icon dark x-large>
                far fa-hand-paper
              </v-icon>
            </v-btn>
          </template>
          <span>Paper</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mx-2" fab dark x-large color="#28b4e5" v-bind="attrs" v-on="on" @click="playerInput(3)">
              <v-icon dark x-large>
                far fa-hand-scissors fa-flip-horizontal
              </v-icon>
            </v-btn>
          </template>
          <span>Scissor</span>
        </v-tooltip>
      </div>
      <v-card-text class="text-center">
        <p class="text-h6 font-weight-bold">Total round : {{ gameRound }}</p>
        <v-btn :disabled="this.isCountDownRun" class="mt-n7" x-small color="secondary" :to="{path: '/'}">
          Back To Main Menu
        </v-btn>
      </v-card-text>

      <!-- dialog final result -->
      <v-dialog v-model="dialogFinalResult" persistent width="500">
        <v-card>
          <v-card-text class="pt-5 text-h4 text--primary font-weight-bold text-center">
            {{ textFinalResult }}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" text @click="resetGame()">
              Try again
            </v-btn>
            <v-btn color="black" text :to="{path: '/'}">
              Back To Main Menu
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- end dialog final result -->
    </v-card>
</template>

<script>
  import JSConfetti from 'js-confetti'
  const jsConfetti = new JSConfetti()

  export default {
    data() {
      return {
        pattern: [],
        scorePlayer: 0,
        scoreEnemy: 0,
        chosenByPlayer: 0,
        chosenByEnemy: 0,
        winner: '',
        gameRound: 0,
        patternLength: 10,
        countDown: 30,
        isCountDownRun: false,
        gameLevel: this.$route.params.level,
        textFinalResult: '',
        dialogFinalResult: false
      }
    },
    created() {
      if (!this.$route.params.level) {
        this.$router.push({ path: '/' })
      }
    },
    methods: {
      showConfetti() {
        let x = 0;
        let intervalID = setInterval(function () {
          jsConfetti.addConfetti()
          if (++x === 3) {
            window.clearInterval(intervalID);
          }
        }, 2000);
      },
      async playerInput(rockOrPaperOrScissors) {
        if (this.isCountDownRun === false) this.countDownTimer()
        this.chosenByPlayer = rockOrPaperOrScissors
        this.gameRound++
        await this.whatShouldAIAnswer(this.gameLevel)
        this.whoIsTheWinner()
      },
      prepareData() {
        if (this.pattern.length < 1) {
          for (let index = 1; index <= this.patternLength; index++) {
            this.pattern.push(Math.floor(Math.random() * 3) + 1)
          }
        }
      },
      updatePattern() {
        if (this.gameRound !== 0) {
          this.pattern.shift()
          this.pattern.push(this.chosenByPlayer)
        }
      },
      whatShouldAIAnswer(gameLevel) {
        this.prepareData()
        const net = new brain.recurrent.LSTMTimeStep()
        net.train([this.pattern], { 
          iterations: gameLevel == 'easy' ? 10 : (gameLevel == 'medium' ? 50 : 100), 
          log: true 
        })
        const playerWillChose = net.run(this.pattern)
        this.updatePattern()

        const roundedPlayerWillChose = Math.round(playerWillChose)
        this.chosenByEnemy = 1 <= roundedPlayerWillChose && roundedPlayerWillChose <= 3 ? (roundedPlayerWillChose % 3) + 1 : 1
      },
      whoIsTheWinner() {
        if (this.chosenByPlayer === this.chosenByEnemy) {
          this.winner = 'draw'
        } else if (
          (this.chosenByPlayer === 1 && this.chosenByEnemy === 3) ||
          (this.chosenByPlayer === 3 && this.chosenByEnemy === 2) ||
          (this.chosenByPlayer === 2 && this.chosenByEnemy === 1)
          ) {
          this.winner = 'player'
          this.scorePlayer++
        } else {
          this.winner = 'enemy'
          this.scoreEnemy++
        }
      },
      countDownTimer() {
        const vm = this
        this.isCountDownRun = true

        if (this.countDown > 0) {
          let timer = setInterval(() => {
            vm.countDown--

            if (vm.countDown === 0 && vm.scorePlayer < 20 && vm.scoreEnemy < 20) {
              clearInterval(timer)
              this.dialogNoOneWins()
            } else if (vm.scorePlayer >= 20) {
              clearInterval(timer)
              this.dialogPlayerWins()
            } else if (vm.scoreEnemy >= 20) {
              clearInterval(timer)
              this.dialogEnemyWins()
            } else if (vm.countDown === 0 && vm.scorePlayer === vm.scoreEnemy) {
              clearInterval(timer)
              this.dialogDraw()
            }

          }, 1000)
        }
      },
      dialogPlayerWins() {
        this.textFinalResult = 'You Wins, congratulations!!!'
        this.dialogFinalResult = true;
        showConfetti()
      },
      dialogEnemyWins() {
        this.textFinalResult = 'Enemy Wins, you are defeated by machine!!'
        this.dialogFinalResult = true;
      },
      dialogNoOneWins() {
        this.textFinalResult = 'Times up, no one can reach score 20!!!'
        this.dialogFinalResult = true;
      },
      dialogDraw() {
        this.textFinalResult = 'Why draw?, please try again'
        this.dialogFinalResult = true;
      },
      resetGame() {
        this.pattern = []
        this.scorePlayer = 0
        this.scoreEnemy = 0
        this.chosenByPlayer = 0
        this.chosenByEnemy = 0
        this.winner = ''
        this.finalWinner = ''
        this.gameRound = 0
        this.patternLength = 10
        this.countDown = 30
        this.isCountDownRun = false
        this.gameLevel = this.$route.params.level,
        this.textFinalResult = '',
        this.dialogFinalResult = false
      }
    }
  }
</script>

