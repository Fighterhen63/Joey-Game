let game = {
    messageIndex: 0,
    gettingName: true,
    playerName: "",
    initialDreamMessages: [
        "Welcome to the world of Eatermon. What is your name?",
        "This is a very different world from the world you know. In your world many people eat food, and it is how they survive.",
        "Here food is not a necessity and due to a weird paradox universe food is alive.",
        `Instead they are creatures we investigate and use for fun. We call those creatures <b>Eatermons</b>.`,
        `What story awaits you? Let's find out!`
    ],
    momMessageText: [
        "",
        `You Should Come Downstairs!`,
    ],
    downstairsMomMessageText: [
        "",
        `Some kid named Elijah is outside waiting for you. You Should Go See Him!`,

    ],
    firstElijahMessageText: [
        "",
        `The professor (or my dad pretty cool huh) has been waiting for both of us since we both turned 16 today!`,

    ],
    currentMessageArray: [],
    isMomMessageComplete: false,
    currentMessageHandler: null, // Function to handle key press
    cutSceneState: 0, // 0: initial, 1: downstairs
    isTransitioning: false, // New flag to prevent multiple transitions during an active one
    buttonClicked: false, // Flag to track if a button was clicked
    buttonResult: "", // Stores the result of the button click
    buttonResultShown: false, // Track if button result has been shown.
    waitingForEnter: false, // Flag to track if waiting for enter press
    routeOne: false, 
    goingToElijah: false, 
};


let momMessageDone = false;

function startScreen() {
    let startingOverlay = document.getElementById('startingScene');
    startingOverlay.style.display = `block`;
    startingOverlay.style.backgroundColor = 'black';
    npcNormal = false;
    normal = false;

    npcName.innerHTML = `Dream Warden`;
    npcP.innerHTML = game.initialDreamMessages[game.messageIndex];
    npcTextBox.style.display = 'block';
    npcTextBox.innerHTML = `Please enter your name below:`;
    initalCutsceneName.style.display = 'block';
    initalCutScene = true;

    let floatingZs = document.createElement('div');
    floatingZs.classList.add('floating-zs');
    startingOverlay.appendChild(floatingZs);

    for (let i = 0; i < 4; i++) {
        let z = document.createElement('span');
        z.classList.add('z');
        z.innerHTML = 'Z';
        floatingZs.appendChild(z);
    }

    npcTextBox.focus();
    game.currentMessageHandler = handleKeyPress;
    document.addEventListener('keydown', game.currentMessageHandler);
    game.currentMessageArray = game.initialDreamMessages;
    showNpcText();
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !game.gettingName && !game.isTransitioning && !game.waitingForEnter && !game.buttonClicked) {
        console.log("Key pressed: Enter");

        // If a button was clicked, proceed to the next message
        if (game.buttonClicked) {
            game.buttonClicked = false;  // Reset flag
            showNextMessage();  // Proceed to the next message
        } else {
            showNextMessage();
        }
    }
}


function showNextMessage() {
    const currentArray = game.currentMessageArray;

    console.log("Current Message Array:", currentArray);
    console.log("Current Message Index:", game.messageIndex);

    // Check if we are at the point where the first Elijah message is displayed
    if (game.currentMessageArray[game.messageIndex] === game.firstElijahMessageText[0] && !game.buttonClicked) {
        let questionOneButton = document.getElementById('questionButton1');
        let questionTwoButton = document.getElementById('questionButton2');
        questionOneButton.innerHTML = `Why have I never met you before?`; 
        questionTwoButton.innerHTML = `My Mail?`; 
        showQuestionButtons();
    }

    // Check if we still have messages to show
    if (game.messageIndex < currentArray.length) {
        if (game.buttonResultShown && game.messageIndex === game.firstElijahMessageText.length) {
            //Reset button shown and continue normally
            game.buttonResultShown = false;
        }

        npcP.innerHTML = currentArray[game.messageIndex];
        console.log("Showing message:", currentArray[game.messageIndex]);
        game.messageIndex++;  // Increment after showing the message
        console.log("Updated Message Index:", game.messageIndex);
    } else {
        console.log("No more messages in this array.");
        // Handle the completion of messages
        if (currentArray === game.initialDreamMessages) {
            handleInitialDreamMessagesComplete();
        } else if (currentArray === game.downstairsMomMessageText) {
            handleDownstairsMomMessagesComplete();
        } else if (currentArray === game.momMessageText) {
            handleMomMessagesComplete();
        } else if (game.buttonResultShown && currentArray === game.firstElijahMessageText) {
            //Reset button shown and continue normally
            game.buttonResultShown = false;
        } else if(currentArray === game.firstElijahMessageText) {
            handleMeetElijahComplete(); 
        }
        else if (currentArray === game.firstElijahMessageText && game.buttonResult != "") {
            npcP.innerHTML = game.buttonResult;
            game.buttonResult = "";
            game.messageIndex++;
            game.buttonResultShown = true;
        }
        else {
            npcP.innerHTML = currentArray[game.messageIndex];
        }
    }
}





function handleDownstairsMomMessagesComplete() {
    console.log("Downstairs Mom Messages Complete.");
        hideNpcText();
        npcNormal = true;
        normal = true;
        let npcTextContainer = document.getElementById('npcTextContainer');
        npcTextContainer.classList.remove('show');
        npcTextContainer.style.display = 'none';
        document.removeEventListener('keydown', game.currentMessageHandler);
        momMessageDone = true;
        initalCutScene = false; // If you want to start the next part of the game
}

function handleMomMessagesComplete() {
    console.log("Mom Messages Complete.");
    game.isTransitioning = true; // Flag transition start
        hideNpcText();
        npcNormal = true;
        normal = true;
        let npcTextContainer = document.getElementById('npcTextContainer');
        npcTextContainer.classList.remove('show');
        npcTextContainer.style.display = 'none';
        document.removeEventListener('keydown', game.currentMessageHandler);
        momMessageDone = true;
        initalCutScene = false;
        game.isTransitioning = false; // Flag transition end
}


function handleInitialDreamMessagesComplete() {
    console.log("Initial Dream Messages Complete.");
    npcP.innerHTML = `I have told you all I can for now. Wake Up ${game.playerName}!`;
        hideNpcText();
        initalCutsceneName.style.display = 'none';
        game.currentMessageArray = [];
        game.messageIndex = 0;
        document.removeEventListener('keydown', game.currentMessageHandler);

        let startingOverlay = document.getElementById('startingScene');
        startingOverlay.classList.add('hidden');
        startingOverlay.addEventListener('transitionend', () => {
            startingOverlay.classList.add('hidden');
            startingOverlay.style.display = 'none';
            let npcTextContainer = document.getElementById('npcTextContainer');
            npcTextContainer.classList.remove('show');
            npcTextContainer.style.display = 'none';
            momMessage();
        });
}


function submitName() {
    game.playerName = npcTextBox.value.trim();
    if (game.playerName !== '') {
        npcP.innerHTML = `Welcome, ${game.playerName}, to the world of Eatermon!`;
        npcTextBox.style.display = 'none';
        initalCutsceneName.style.display = 'none';
        game.messageIndex = 0;
        game.gettingName = false;
    } else {
        npcTextBox.innerHTML = `Please enter a valid name.`;
    }
}


function momMessage() {
    npcNormal = false;
    normal = false;
    game.momMessageText[0] = `Good Morning ${game.playerName}! Happy Birthday!`;
    game.messageIndex = 0;
    npcName.innerHTML = `Mom`;
    npcP.innerHTML = game.momMessageText[game.messageIndex];
    npcTextBox.focus();
    game.currentMessageArray = game.momMessageText;
    game.currentMessageHandler = handleKeyPress;
    document.addEventListener('keydown', game.currentMessageHandler);
    showNpcText();
}

function momMessageDownstairs() {
    npcNormal = false;
    normal = false;
    game.downstairsMomMessageText[0] = `Hello ${game.playerName}`;
    game.messageIndex = 0;
    npcName.innerHTML = `Mom`;
    npcP.innerHTML = game.downstairsMomMessageText[game.messageIndex];
    momMessageDone = false;
    npcTextBox.focus();
    game.currentMessageArray = game.downstairsMomMessageText;
    game.currentMessageHandler = handleKeyPress;
    document.addEventListener('keydown', game.currentMessageHandler);
    showNpcText();
    goingToElijah = true;
}

function meetingElijah() {
    let questionOneButton = document.getElementById('questionButton1');
    let questionTwoButton = document.getElementById('questionButton2');
    npcNormal = false;
    normal = false;
    game.firstElijahMessageText[0] = `Hi ${game.playerName}! I went through your mail so I know your name!`; 
    game.messageIndex = 0;
    npcName.innerHTML = `Elijah`;
    npcP.innerHTML = game.firstElijahMessageText[game.messageIndex];
    npcTextBox.focus();
    game.currentMessageArray = game.firstElijahMessageText;
    game.currentMessageHandler = handleKeyPress;
    document.addEventListener('keydown', game.currentMessageHandler);
    showQuestionButtons(); 
    questionOneButton.innerHTML = `Why have I never met you before?`; 
    questionTwoButton.innerHTML = `My Mail?`; 
    game.buttonClicked = true; 
    // Add event listeners to the buttons
    questionOneButton.addEventListener('click', function() {
        displayResultMessage("Why have I never met you before?");
    });

    questionTwoButton.addEventListener('click', function() {
        displayResultMessage("My Mail?");
    });

    showNpcText();
    goingToElijah = false;
}

function handleMeetElijahComplete() {
        hideNpcText();
        npcNormal = true;
        normal = true;
        let npcTextContainer = document.getElementById('npcTextContainer');
        npcTextContainer.classList.remove('show');
        npcTextContainer.style.display = 'none';
        document.removeEventListener('keydown', game.currentMessageHandler);
        meetingElijah = false;
        routeOne = true; 
}

function displayResultMessage(buttonClicked) {
    let resultMessage = '';

    // Set flag to true once a button is clicked
    game.buttonClicked = false;

    if (buttonClicked === "Why have I never met you before?") {
        resultMessage = `Elijah: "Oh, well, I usually stay in the background and avoid meeting people directly. I guess I missed you until now!"`;
    } else if (buttonClicked === "My Mail?") {
        resultMessage = `Elijah: "I found some letters in your mailbox. Nothing too exciting, just some birthday wishes and a few coupons."`;
    }

    // Store the result message in game.buttonResult
    game.buttonResult = resultMessage;

    // Optionally, hide the buttons after an answer is given
    hideQuestionButtons();

    //Show the result message right away.
    npcP.innerHTML = resultMessage;
    game.messageIndex++; //increment index to skip the original question text.
    game.buttonResultShown = true;
}




function hideNpcText() {
    npcTextContainer.classList.remove('show');
    npcTextContainer.style.display = 'none';
}

function hideQuestionButtons() {
    let questionOneButton = document.getElementById('questionButton1');
    let questionTwoButton = document.getElementById('questionButton2');
    questionOneButton.style.display = 'none'; 
    questionTwoButton.style.display = 'none'; 

}

function showQuestionButtons() {
    let questionOneButton = document.getElementById('questionButton1');
    let questionTwoButton = document.getElementById('questionButton2');
    questionOneButton.style.display = 'block'; 
    questionTwoButton.style.display = 'block'; 

}



// startScreen();

function debugNoScreen() {
    momMessageDone = true; 
    npcNormal = true; 
}