<template>
  <v-card class="rounded-xl" elevation="8" width="360">

    <v-card-text class="text-center">
      <p class="text-h4 text--primary text-center font-weight-bold">Score</p>
      <div>
        <p v-if="this.winner === 'player'" class="text-h5 text--primary font-weight-bold">Player win</p>
        <p v-else-if="this.winner === 'enemy'" class="text-h5 text--primary font-weight-bold">Enemy win</p>
        <p v-else-if="this.winner === 'draw'" class="text-h5 text--primary font-weight-bold">Draw</p>
      </div>
      <v-row class="text-center mt-n5">
        <v-col>
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
        <v-col>
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
    <v-card-text class="text-center mt-n6">
      <p 
        v-if="this.isCountDownRun === true" 
        class="text-h5 font-weight-bold text--primary">
        {{ countDown }} seconds
      </p>
      <p 
        v-else 
        class="text-h5 font-weight-bold text--primary">
        Choose one to start
      </p>
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
      <p class="text-h6 font-weight-bold">Total round : {{ gameCount }}</p>
      <v-btn :disabled="this.isCountDownRun" class="mt-n7" x-small color="secondary" dark :to="{path: '/'}">
        Back to Main Menu
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        pattern: [],
        scorePlayer: 0,
        scoreEnemy: 0,
        chosenByPlayer: 0,
        chosenByEnemy: 0,
        winner: '',
        finalWinner: '',
        gameCount: 0,
        patternLength: 10,
        countDown: 30,
        isCountDownRun: false
      }
    },
    methods: {
      redirectToWinnerPage() {
        this.$router.push({ 
          name: 'winner', 
          params: { 
            finalWinner: this.finalWinner, 
            scorePlayer: this.scorePlayer ,
            resetGame: this.resetGame
          } 
        })
      },
      async playerInput(rockOrPaperOrScissors) {
        if (this.isCountDownRun === false) this.countDownTimer()
        this.chosenByPlayer = rockOrPaperOrScissors
        this.gameCount++
        await this.whatShouldAIAnswer()
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
        if (this.gameCount !== 0) {
          this.pattern.shift()
          this.pattern.push(this.chosenByPlayer)
        }
      },
      whatShouldAIAnswer() {
        this.prepareData()
        const net = new brain.recurrent.LSTMTimeStep()
        net.train([this.pattern], { iterations: 80, log: true })
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

            if (vm.countDown === 0 && vm.scorePlayer < 20) {
              clearInterval(timer)
              this.popupPlayerLose()
            } else if (vm.scorePlayer >= 20) {
              clearInterval(timer)
              this.popupPlayerWins()
            } else if (vm.scoreEnemy >= 20) {
              clearInterval(timer)
              this.popupEnemyWins()
            } else if (vm.countDown === 0 && vm.scorePlayer === vm.scoreEnemy) {
              clearInterval(timer)
              this.popupDraw()
            }

          }, 1000)
        }
      },
      popupPlayerWins() {
        this.finalWinner = 'You Wins, congratulations!!!'
        this.redirectToWinnerPage()
      },
      popupPlayerLose() {
        this.finalWinner = 'Times up, You lose because cannot reach 20 score!!!'
        this.redirectToWinnerPage()
      },
      popupEnemyWins() {
        this.finalWinner = 'Computer Wins, you are defeated by the machine!!'
        this.redirectToWinnerPage()
      },
      popupDraw() {
        this.finalWinner = 'Why draw?, please try again'
        this.redirectToWinnerPage()
      },
      resetGame() {
        this.pattern = []
        this.scorePlayer = 0
        this.scoreEnemy = 0
        this.chosenByPlayer = 0
        this.chosenByEnemy = 0
        this.winner = ''
        this.finalWinner = ''
        this.gameCount = 0
        this.patternLength = 10
        this.countDown = 30
        this.isCountDownRun = false
      }
    }
  }
</script>