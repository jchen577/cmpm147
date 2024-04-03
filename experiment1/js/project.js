// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

const fillers = {
  gamers: ["Gamers","Homies","Fellas that lack sleep","Individuals that need grass","Button mashers","G-fuelers","Monkey wrenches"],
  first: ["Mountain Dew!","bitches.","seodorant.","sleep!","better games!"],
  people: ["kindly", "meek", "brave", "wise", "sacred", "cherished", "honored", "forgotten", "apathetic", "mystic", "orca", "帥氣"],
  item: ["laptop","box","pickaxe","microphone","hope","anxiety","depression","jokes","happiness","homework","mouse","monitor"],
  num: ["two", "three", "eleven", "so many", "too many", "an unsatisfying number of", "barely any", "an unspecified amount of", "surely a satisfactory number of"],
  loot1: ["old","busted","OP","sparkly","awe-inspiring","remarkable","flashy","lame","horn-swaggling","eye-opening"],
  loot2: ["bandwiths"],
  baddies: ["Wes Modes", "Bob","Josh","that one guy from the dining hall","Einstein","squirrels","rabbits with carrots","Joe"],
  message: ["summon","discord call","notification","alert","the words coming out my mouth","...o there they go"],
  
};

const template = `$gamers, listen to my $message!

I'm here to announce that we are in deseperate need of $first If we do not refill immediately, we will be absolutely destroyed by $baddies. You must venture forth at once, taking my $item, and help yourself.

Once you save yourself you will be awarded with $num $loot1 $loot2. So uhhhhhhh good luck with that.
`;


// STUDENTS: You don't need to edit code below this line.

const slotPattern = /\$(\w+)/;

function replacer(match, name) {
  let options = fillers[name];
  if (options) {
    return options[Math.floor(Math.random() * options.length)];
  } else {
    return `<UNKNOWN:${name}>`;
  }
}

function generate() {
  let story = template;
  while (story.match(slotPattern)) {
    story = story.replace(slotPattern, replacer);
  }

  /* global box */
  box.innerText = story;
}

/* global clicker */
clicker.onclick = generate;

generate();
