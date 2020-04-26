/**
 * @name logicBlock
 * @author Saurav Dutta
 * @description file to process incoming messages and deliver proper responses
 */

/**
 * Greetings array block initialized with outgoing messages
 */
const greetingsBlock = [
  "Aur kar bhi kya sakti hoon, lockdown me dimaag kharab ho gaya",
  "Much better, now that you are with me. Please thoda time spend karo merey saath?",
  "I am minding my own business, aapke paas kaam nahi hai kya?",
  "Merey friends kehte hey ki anjaan logo ke saath baat nahi kartei",
  "Aap kaun hai ? What's your name?"
];

/**
 * followUpBlock array block initialized with outgoing messages
 */
const followUpBlock = [
  "I am not interested in your name, code karke mujhe improve karo",
  "mey CID nahi hoon, I don't have all your answers, please contribute to my master's work",
  "abhi lockdown hey, don't waste time and please make my architecture better"
]

/**
 * Weather array block initialized with outgoing messages
 */
const weatherBlock = [
  "khirki se bahar bhi dekh lo kabhi",
  "You are sitting all day in house. kya ukhar logey jaanke?",
  "Why?, dhhoop nikle toh bhi, bahar jaane ka nahi"
];

/**
 * default array block initialized with outgoing messages
 */
const defaultBlock = [
  "apne pronunciation pe dhyan dey",
  "Samajh nahi aaya. Can you please repeat?",
  "try speaking properly"
];

/**
 * roomBlock array block initialized with outgoing messages
 */
const roomBlock = [
  "bahar jaake, healthy khaana leke aao. kitna maggi khaate rahogey",
  "When are you planning to read those books on your shelf? lockdown mey kuch productive bhi kar lo",
  "remember office table tennis?, kahi tumne apna bat drawer mey rakh diya kya?",
  "helmet mila toh kya ?, choop chap ghar pey raho",
  "TGIF yaad aa rahi hai?, phir bhi saamne ke shop se lene ka nahi",
  "kitnaa office ke fridge se paper boat churaoge",
  "dhyaan se, it's hot, gir jaaega",
  "subha subha kaam dhandha nahi hai kya?, go and have your breakfast",
  "bohat kaam kar liye, go have your lunch",
  "client ko dikhaane ke liye kaam ho gaya. Now go for dinner"
];

/**
 * Function to process and deliver outgoing message based on user's message
 * @param {String} message
 */
const calculateAnswer = (message, data) => {
  data = data || null;
  let element = document.getElementById("workspace");
  let lightElement = document.getElementsByClassName("bulb")[0];

  if (message.includes("how are you")) {
    return greetingsBlock[Math.floor(Math.random() * greetingsBlock.length)];
  } else if (message.includes("how is the weather")) {
    return weatherBlock[Math.floor(Math.random() * weatherBlock.length)];
  } else if (message.includes("light off")) {
    element.style.background = "#000";
    element.style.height = "100vh";
    element.style.opacity = "0.8";

    lightElement.style.backgroundColor = "grey";
    lightElement.style.boxShadow = "none";
    return `andherey mey kya irada hai?`;
  } else if (message.includes("light on")) {
    element.style.background = "#fff";
    element.style.height = 0;
    element.style.opacity = 1;

    lightElement.style.backgroundColor = "#f8e287";
    lightElement.style.boxShadow = "0 0 100px #f8e287";
    return `kaam dhandha nahi hai kya? off on off on, kya chal raha hai?`;
  } else if (message.includes("note")) {
    return roomBlock[0];
  } else if (message.includes("books")) {
    return roomBlock[1];
  } else if (message.includes("ttbat")) {
    return roomBlock[2];
  } else if (message.includes("helmet")) {
    return roomBlock[3];
  } else if (message.includes("beer")) {
    return roomBlock[4];
  } else if (message.includes("trash")) {
    return roomBlock[5];
  } else if (message.includes("cup")) {
    return roomBlock[6];
  } else if (message.includes("breakfast")) {
    return roomBlock[7];
  } else if (message.includes("lunch")) {
    return roomBlock[8];
  } else if (message.includes("dinner")) {
    return roomBlock[9];
  } else if (message.includes("quizAnnouncement")) {
    return `okay, so you want to see chamatkaar. Write your name in the clipboard, press start and I will guess your gender and enthnicity`;
  } else if (message.includes('quiz')) {
    return `okay ${data.name}, I think, you are, an ${data.ethnicity} ${data.gender}.`
  } else if (message.includes('name') && message.includes('my')){
    return followUpBlock[0];
  } else if (message.includes('why') || message.includes('friends') || message.includes('anjaan')){
    return followUpBlock[1];
  } else if (message.includes('lockdown')){
    return followUpBlock[2];
  } else {
    return defaultBlock[Math.floor(Math.random() * defaultBlock.length)];
  }
};

exports.calculateAnswer = calculateAnswer;
