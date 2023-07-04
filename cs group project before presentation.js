alert("You've decided to go for a hike. You will begin with full stamina, but you will face challenges. Your goal is to make it to the end of the trail alive.");

//NOTES FOR LINES 3 to 57~:  these are the classes where you will find all the character/hikers
class characterTemplate {
  constructor(energy, sprinting) {
    this.energy = 100;
    this.climbing = -15;
    this.gathering = -5;
    this.sprinting = -50;
    this.bearCrawling = -20;
    this.shelterBuilding = -50;
    this.mapReading = -40;
    this.jumpInLake = -20;
    this.scrathBlister = -40;
    this.keepWalking = -50;
    this.restFeet = -20;
    this.climbTree = -20;
    this.playDead = -80;
    this.throwLunch = -40;
    this.hydrate = 5;
    this.callHelp = -10;
    this.buildFire = -20
    this.giveTreeFiddy = -10;
    this.callHelp = -50;
  }

  // useFirstAid() {
  //   this.energy += 10;
  // }

}

const obj = {
  subzero: class subzero extends characterTemplate {
    constructor(energy, sprinting) {
      super(energy, sprinting);
      this.energy = 120;
      this.sprinting = -30;
      this.hikerType = 'subzero';
      this.greeting = 'heeeeeey';
    }
  },
  
   botanist: class botanist extends characterTemplate {
    constructor(energy, gathering, mapReading) {
      super(energy, gathering, mapReading);
      this.energy = 90;
      this.gathering = -1;
      this.mapReading = -5;
      this.hikerType = 'botanist';
      this.greeting = 'hello';
    }
  },


  //add characters above here
  random: "aaaaaaahhhhhh"
}

//NOTES FROM LINES 60 TO 142:  These are a set of three seperate arrays assigned to variables.  Within these arrays are objects that contain each challenge.  Within each challenge, properties like the name of the challenge and energy expediture for each action is stored here.


let mountainChallenges = [
  {
    trail: 'mountain'
  },
  {
    challenge: "Incline Hill",
    actions: ['sprinting', 'bear crawling', 'build fire', 'gathering'],
    story: "A steep hill looms before you....."
  },

  {
    challenge: "Scramble",
    actions: ['sprinting', 'bear crawling', 'hydrate'],
    story: 'a rock face no more than ten feet....looms before you...'
  },

  {
    challenge: "Rain Storm",
    actions: ['sprinting', 'bear crawling', 'hydrate', 'build fire'],
    story: 'Dark menacing clouds...looms before you...a cold, cold water droplets lands on your face.'
  }

]


let forestChallenges = [
  {
    trail: 'forest'
  },
  {
    challenge: "Poison Ivy",
    actions: ['jump in lake', 'scratch blister', 'play dead']

  },

  {
    challenge: "Blister on your feet",
    actions: ["rest feet", "keep hiking", "sprinting"]

  },

  {
    challenge: "Encountering a bear",
    actions: ['climb tree', 'play dead']

  }

]

let wetlandChallenges = [
  {
    trail: 'wetland'
  },
  {
    challenge: "Muddy tracks",
    actions: ['sprinting', 'bear crawling', 'hydrate']

  },

  {
    challenge: "Diarrhea",
    actions: ['throwLunch', 'hydrate', 'play dead']

  },

  {
    challenge: "Trap hole",
    actions: ['call help', 'build fire', 'play dead']
  },

  {
    challenge: "Thunderdome",
    actions: ['call help', 'build fire', 'play dead'],
    story: 'THUUUUUUNDERDOOOOMEE'
  },

  {
    challenge: "Lochness monster\'s cave",
    actions: ['call help', 'build fire', 'play dead', 'give tree fiddy'],
    story: 'Hey can I barrow about five dollars? No? How about tree fiddy?'
  }

]

//NOTES FOR LINES 143 TO 171: These lines makes an object detailing what type of hiker the user has chosen.  The object made here will keep track of the user energy and what special abilities their hiker might have.  Object is made using classes as the object constructor. those are located on lines 3 to 53

function getUserInputTwo() {
  let userInput = '';

  let spellChecker = false;
    
  while (spellChecker == false){
    userInput = prompt('choose character: subzero, botanist, or random?');
    userInput = userInput.toLowerCase();
    
    spellChecker = Object.keys(obj).includes(userInput) ? true : false;
    
    // console.log(allChallenges.map(element => element[0].trail));
    if(spellChecker == false) {alert('mistype or wrong entry!');}
  }

  if (userInput == 'random'){
    userInput = Object.keys(obj)[Math.floor(Math.random() * (Object.keys(obj).length - 1))];
    console.log(`You are now...${userInput}!`);
  }
  
  //Potentially add in an edge case
  //here we can manipulate userInput with string methods
  let newChar = new obj[userInput]();

  return newChar;
}


//NOTES FROM 174 to 229:  This function prompts the user to pick actions for each challenge.  The challenges are moved forward by a for loop.

function encounteringChallenge(array, newCharTwo) {
  //console.log('line 174 activated encounteringChallenge');
  //console.log('passed in array: ', array);
  //console.log('passed in newCharTwo', newCharTwo);
  let encounterTracker = [];
  
  for (let i = 1; i < 4; i++) {
    //alert('Hey, first aid?');
    let encounterChecker = false;
    let encounter = 0;
    
    while (encounterChecker == false) {
      encounter = Math.floor(Math.random() * (array.length - 1) + 1);
      encounterChecker = encounterTracker.includes(encounter) ? false : true;
      // console.log(encounter);
      // console.log(encounterTracker);
      // console.log(encounterChecker);
    }
    encounterTracker.push(encounter);
    
    //console.log('line 178 for loop activated');
    alert(`This is your obstacle! ${array[encounter].challenge}`);
    if(array[encounter].story) {
      alert(array[encounter].story);
    }

    let setOfPossibleActions = array[encounter].actions;
    //console.log(setOfPossibleActions);

    let userAction = '';
    let spellChecker = false;

    while (spellChecker == false) {
      userAction = prompt(`You can do one of the following actions: ${setOfPossibleActions.join(", ")}. `);
      userAction = userAction.toLowerCase();
      
      spellChecker = setOfPossibleActions.includes(userAction) ? true : false;

      if(spellChecker == false) {alert('mistype or wrong entry!');}
      
    }

    userAction = userAction.replaceAll(/\s\w/g, letter => letter.toUpperCase()).replaceAll(' ', '');
    newCharTwo.energy = newCharTwo.energy + newCharTwo[userAction]

    if (newCharTwo.energy > 0) {
      console.log(`Your energy level is at ${newCharTwo.energy}`);
    } else {
      console.log(`You are DEAD! Energy Level: ${newCharTwo.energy}`);
      return console.log("Game Over!!! Hope you enjoyed the game.")
    }
    
  }
}


//NOTES 234 TO 261:  This is the higher order function that calls in all other functions and objects.  This is where we will chain the functions together to run the adventure/program.


function adventure(getUserInput, encounterChal) {
  //console.log('activitated adventure function');
  alert("WARNING: entries need to be spelled correctly");
  let newChar = getUserInput();
  let mountain = mountainChallenges;
  let forest = forestChallenges;
  let wetland = wetlandChallenges;
  let allChallenges = [mountain, forest, wetland];
  //console.log('line 204: ', allChallenges);
  let adventureUserInput = '';
  let spellChecker = false;

  while (spellChecker == false){
    adventureUserInput = prompt('pick a trail: mountain, forest, or wetland');
    spellChecker = allChallenges.map(element => element[0].trail).includes(adventureUserInput) ? true : false;
    // console.log(allChallenges.map(element => element[0].trail));
    // console.log(adventureUserInput);
    // console.log(spellChecker);
    if(spellChecker == false) {alert('mistype or wrong entry!');}
  }
  
  let trailPicked = allChallenges.filter((x) => adventureUserInput === x[0].trail).pop();
  //console.log('line 208: ', trailPicked);
  encounterChal(trailPicked, newChar);
  // return trailPicked[0];
}


//NOTES: this bit initiates the whole thing.  

adventure(getUserInputTwo, encounteringChallenge);




//psudocode

  //ask user what trail to go on show abilities (use of returning player properties of energy, and character special abilities);



    //maybe a function that asks the player whether they want some details for the trails

//player chooses the trailer route
  //first challenge, will be pulled from the array with nest obj/class with contructor/other
    //user choses an action that updates the energy pool
  //next challenge
  //final challenge

//if statements that check if the energy pool is 0
  //if it hit zero then initiate the game over function

