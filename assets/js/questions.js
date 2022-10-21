const questions = [
    {
        prompt: "Date.now() returns the time in ________.",
        choices: ["hours","minutes","seconds","milliseconds"],
        answer: 3
    },
    {
        prompt: "Which expression returns a reference to a DOM element with id of \'good-element\'?",
        choices: ["window.getElementById(good-element)","document.getElementById(\'good-element\')","window.getElementById(\'good-element\')","document.getElementById(good-element)",],
        answer: 1
    },
    {
        prompt: "What does DOM stand for?",
        choices: ["Definitely Oscar Meyer","Drink Only Mead","Document Object Model","DOMINATION"],
        answer: 2
    },
    {
        prompt: "Which expression returns the length of array \'gibbons[]\'",
        choices: ["gibbons.length","gibbons.arrayLength","gibbons.howMany()","Array.length(gibbons)"],
        answer: 0
    },
    {
        prompt: "Which piece of code will store all data in array \'gibbons[]\' in the browser's local storage without errors?",
        choices: ["\nfor(let i=0 ; i<=gibbons.length ; i+=1) { \nwindow.localStorage.setItem(\"gibbons\"+i,\"\"+gibbons[i];\n}\n",
                "\nfor(let i=1 ; i<gibbons.length ; i++) { \nwindow.localStorage.setItem(\"gibbons\"+i,\"\"+gibbons[i];\n}\n",
                "\nfor(let i=0 ; i<gibbons.length ; i++) { \nwindow.localStorage.setItem(\"gibbons\"+i,\"\"+gibbons[i];\n}\n",
                "\nconst gibbonStore = store.allGibbons(); \ngibbonStore.closeUpForTheNight(gibbons);\n"],
        answer: 2
    },
];