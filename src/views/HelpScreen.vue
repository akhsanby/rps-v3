<template>
  <v-card class="mx-auto my-auto" max-width="800">
    <v-card-text class="text-center">
      <p class="text-h4 text--primary font-weight-bold">Welcome to Game</p>
      <p class="text-h5 mt-n4">Rock Paper Scissor</p>
    </v-card-text>
    <v-card-text class="text-center">
      <p class="text-h5 text--primary font-weight-bold mt-n5">Can you reach 20 score in 30 seconds? if you could, prove it</p>
      <p class="caption mt-n5">Tips : The game will defeat you, if you choose same pattern within period, remember this game is smart</p>
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
	  	<v-btn x-small color="secondary" dark :to="{path: '/'}">
	      Back to Main Menu
	    </v-btn>
    </v-card-text>
  </v-card>
</template>