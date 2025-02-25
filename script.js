let currentStep = "start";
// Declare inventory variables
var key = false;
var weapon = false;

// List for Inventory
let inventory = [];

// HTML Link process
function hideElement(id) {
    document.getElementById(id).classList.add("hidden");
}

function showElement(id) {
    document.getElementById(id).classList.remove("hidden");
}
// Declare Background Audio Loop
const startBtn = document.getElementById("start-btn");

function showStory(text) {
    const storyText = document.getElementById("story-text");
    storyText.innerHTML = text;
}
// Get the help button and the help info
const helpBtn = document.getElementById('help-btn');
const helpInfo = document.getElementById('help-info');

// Add event listener to the help button
helpBtn.addEventListener('click', function() {
    // User can toggle the visibility of the help info section
    if (helpInfo.style.display === 'none' || helpInfo.style.display === '') {
        helpInfo.style.display = 'block';
    } else {
        helpInfo.style.display = 'none';
    }
});
// Updated Audio Buttons
const audioPlayPauseBtn = document.getElementById("audioPlayPauseBtn");
const audioMuteBtn = document.getElementById("audioMuteBtn");
const audioVolumeSlider = document.getElementById("audioVolumeSlider");

// Start Game
startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    storyContainer.classList.remove("hidden");
    audio.play();
    audioPlayPauseBtn.textContent = "Pause";
});

// Play/Pause functionality
audioPlayPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        audioPlayPauseBtn.textContent = "Pause";
    } else {
        audio.pause();
        audioPlayPauseBtn.textContent = "Play";
    }
});

// Mute/Unmute functionality
audioMuteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    audioMuteBtn.textContent = audio.muted ? "Unmute" : "Mute";
});

// Volume control with smooth color fill effect
audioVolumeSlider.addEventListener("input", () => {
    audio.volume = audioVolumeSlider.value;
    let percentage = audioVolumeSlider.value * 100;
});

// Auto-update button text when audio ends
audio.addEventListener("ended", () => {
    audioPlayPauseBtn.textContent = "Play";
});
// Function for inventory
function updateInventory() {
    const inventoryList = document.getElementById("inventory-list");
    inventoryList.innerHTML = ""; // Clear previous inventory items

    inventory.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        inventoryList.appendChild(li);
    });
}
// Avoids inventory duplicates, pushes list
function addToInventory(item) {
    if (!inventory.includes(item)) { // Avoid duplicates
        inventory.push(item);
        updateInventory();
    }
}
// Core game functions
function startStory() {
    showElement("story-container");
    hideElement("start-screen");
    showStory("You find yourself at the entrance of a dark maze. There are three paths ahead of you. Do you go 'left', 'right', or 'straight'?");
    currentStep = "start";
}
// User input message box
function handleChoice() {
    const userChoice = document.getElementById("user-choice").value.toLowerCase().trim();
    // Ends the game if "stop" is typed
    if (userChoice === "stop") {
        endGame();
        return;
    }

    // Restarts the game if "restart" is typed
    if (userChoice === "restart") {
        restartGame();
        weapon = false;
        key = false;
        return;
    }

    // Makes choices based on user input
    if (isValidChoice(userChoice)) {
        makeDecision(userChoice);
    
    // Invalid choice message if user types other than options given
    } else {
        alert("Please enter a valid choice based on the options provided!");
    }

    document.getElementById("user-choice").value = ""; // Clears input field
}

// Restart message when game is won
function showWinRestartOption() {
    const restartMessage = document.createElement('p');
    restartMessage.textContent = "Congratulations! You've completed the maze. Type 'restart' to play again.";
    document.getElementById("story-text").appendChild(restartMessage);
    document.getElementById("user-choice").disabled = false;
    document.getElementById("submit-choice-btn").disabled = false;
    document.getElementById("user-choice").value = ""; // Makes input field dissappear
}

function showLoseRestartOption() {
    const restartMessage = document.createElement('p');
    restartMessage.textContent = "Oh no! You weren't able to complete the maze. Type 'restart' to play again.";
    document.getElementById("story-text").appendChild(restartMessage);
    document.getElementById("user-choice").disabled = false;
    document.getElementById("submit-choice-btn").disabled = false;
    document.getElementById("user-choice").value = ""; // Makes input field dissappear
}

// Based on user typed choices leads to different screen
function isValidChoice(choice) {
    if (currentStep === "start") {
        return choice === "left" || choice === "right" || choice === "straight";
    // Left path
    } else if (currentStep === "left-path") {
        return choice === "open" || choice === "go back";
    
    } else if (currentStep === "myst-door") {
        return choice === "enter" || choice === "leave";
    
    } else if (currentStep === "locked-door") {
        return choice === "go back";
    
    // Right path
    } else if (currentStep === "right-path") {
        return choice === "fight" || choice === "run away";
    
    } else if (currentStep === "double-doors") {
        return choice === "choose a door" || choice === "leave";

    } else if (currentStep === "choose-door") {
        return choice === "door 1" || choice === "door 2";
    
    } else if (currentStep === "second-door") {
        return choice === "chase it" || "run away";
    
    // Straight path
    } else if (currentStep === "straight-path") {
        return choice === "help" || choice === "keep going";

    } else if (currentStep === "helped-person") {
        return choice ==="continue" || choice === "go back";

    } else if (currentStep === "normal-door") {
        return choice === "answer" || choice === "leave";

    } else if (currentStep === "riddle") {
        return choice ==="coin" || choice !== "coin";
    }
    return false; // Default case, invalid choice
}
// Background change functions based on users choices
function changeBackground(step) {
    let body = document.body;

    if (step === "left-path" || step === "locked-door") {
        body.style.backgroundImage = "url('images/mystery_door.jpg')";
    } else if (step === "right-path") {
        body.style.backgroundImage = "url('images/creature.jpg')";
    } else if (step === "died") {
        body.style.backgroundImage = "url('images/died.jpg')";  // Background for when the player dies 
    } else if (step === "straight-path") {
        body.style.backgroundImage = "url('images/injured.jpg')"; 
    } else if (step === "myst-door") {
        body.style.backgroundImage = "url('images/dark_room.jpg')"; 
    } else if (step === "escaped") {
        body.style.backgroundImage = "url('images/escaped_screen.jpg')"; 
    } else if (step === "normal-door" || step === "riddle") {
        body.style.backgroundImage = "url('images/riddle_door.jpg')"; 
    } else if (step === "double-doors" || step === "choose-door") {
        body.style.backgroundImage = "url('images/double_doors.jpg')"; 
    } else if (step === "second-door") {
        body.style.backgroundImage = "url('images/second_door.jpg')"; 
    } else {
        body.style.backgroundImage = "url('images/hedge.jpg')"; // Default background
    }

    body.style.backgroundSize = "cover"; 
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";
}
// Scenes
function makeDecision(choice) {
    // Start of the maze
    if (currentStep === "start") {
        // Left path
        if (choice === "left") {
            showStory("You take the left path and find a mysterious door. Do you want to 'open' it or 'go back'?");
            currentStep = "left-path";
        // Right path
        } else if (choice === "right") {
            showStory("You go right and face a wild creature! Do you try to 'fight' or 'run away'?");
            currentStep = "right-path";
        // Straight path
        } else if (choice === "straight") {
            showStory("You go straight and encounter a suspicious looking injured person, do you 'help' them or 'keep going'?");
            currentStep = "straight-path";        
        }
    }
    // Left path is chosen
    else if (currentStep === "left-path") {
        if (choice === "open") {
            if (key === true) { // Check if key is true
                showStory("You try the key you got, and the lock clicks as you turn the key. The door unlocks! You open it to find a dark and endless room. Do you want to 'enter' it or 'leave'?")
                currentStep = "myst-door";
            } else {
                showStory("After trying to open the door as best you can, you find it to be locked. Perhaps there is a key you can get to open it? You have no choice but to 'go back'.");
                currentStep = "locked-door";
            }
        }        
        } else if (currentStep === "locked-door") {
            if (choice === "go back") {
                showStory("You return to the starting point of the maze. Where will you go now? 'Right', or 'straight'?");
                currentStep = "start";
            }

        } else if (currentStep === "myst-door") {
            if (choice === "enter") {
                showStory("You enter the room and as you look around, spotting a treasure map. You follow it to find a hidden exit. You exit the maze to find yourself back where you started before the maze came along.")
                currentStep = "escaped"
                showWinRestartOption();
            } else if (choice === "leave") {
                showStory("You turn back and end up where you started.")
                currentStep = "start";
            }    
        }
    
    // Right path is chosen
    else if (currentStep === "right-path") {
        if (choice === "fight") {
            if (weapon === true) { // Checks if weapon is true
                showStory("You bravely fight the creature and win! You spot a chest and open it to find a key, and after looking around you find 2 doors that match the key you just found. Do you want to 'choose a door' or 'leave'?");
                currentStep = "double-doors";
                addToInventory("Key");
            } else { // Check if weapon is false
                showStory("You try your best to fight the creature, but after getting nowhere, you tragically die.");
                currentStep = "died";
                changeBackground("died");
                showLoseRestartOption();
            }
        } else if (choice === "run away") {
            showStory("You run away, but the maze seems even more confusing now. Where will you go next? 'Left' or 'straight'?");
            currentStep = "start";
            changeBackground("start");
        }
        } else if (currentStep === "double-doors") {
            if (choice === "choose a door") {
                showStory("You look between the doors, contemplating which one to open...will it be 'door 1' or 'door 2'?");
                currentStep = "choose-door"
            } else if (choice === "leave") {
                showStory("You leave, but it seems like getting lost is easier now. Where will you go next?");
                currentStep = "start";
            }
        } else if (currentStep === "choose-door") {
            if (choice === "door 1") {
                showStory("You unlock the first door, and as you open it, you find yourself consumed by the darkness. Unfortunately you die.");
                showLoseRestartOption();
                currentStep = "died";
            } else if (choice === "door 2") {
                showStory("You unlock the second door to reveal a long hallway. Looking towards the end of the hallway, you see a figure, and as you open the door wider, the shadow runs away. Do you want to 'chase it' or 'leave'?");
                currentStep = "second-door";
            }
        } else if (currentStep === "second-door") {
            if (choice === "chase it") {
                showStory("You chase the figure for a while, but just as you're about to catch up to the mysterious shadow, it disappears. As you look around, you find that you are no longer in the maze.");
                showWinRestartOption();
                currentStep = "escaped";
            } else if (choice === "leave") {
                showStory("You return to the starting point of the maze. Where will you go now?");
                currentStep = "start";
            }
        }
    

    // Straight path chosen
    else if (currentStep === "straight-path") {
        if (choice === "help") {
            showStory("You help this suspicious looking injured person, and in return you get a weapon and a key! They tell you to go back and take the left path, but whatever you do, don't continue forward. Do you 'go back' or 'continue'?");
            currentStep = "helped-person";
            key = true;
            weapon = true;
            addToInventory("Key");
            addToInventory("Sword");
        } else if (choice === "keep going") {
            showStory("You find an ominously normal looking door, and on the door is a riddle, do you 'answer' or 'leave'?");
            currentStep = "normal-door";
        }
    }
        // Person helped
        if (currentStep === "helped-person") {
            if (choice === "continue") {
                showStory("You find a normal looking door, and on the door is a riddle, do you 'answer' or 'leave'?");
                currentStep = "normal-door"
                alert("You now have a key and weapon!");
            } else if (choice === "go back") {
                showStory("You return to the starting point of the maze. Where will you go now? 'Right' or 'left'?");
                currentStep = "start";
                alert("You now have a key and weapon!");
            }
        }
        // Normal door with riddle
        if (currentStep === "normal-door") {
            if (choice === "answer") {
                showStory("What has a head and a tail, but no legs?");
                currentStep = "riddle";
            } else if (choice === "leave") {
                showStory("You return to the starting point of the maze. Where will you go now? 'Right' or 'left'?");
                currentStep = "start";
            }
        } else if (currentStep === "riddle") {
            // Ending
            if (choice === "a coin") {
                showStory("You answered correctly! The door opens before you to a dark forest, as you enter, you realize you are no longer in the maze, the door shuts behind you as you exit.");
                showWinRestartOption();
                currentStep = "escaped";
            } else if (choice !== "a coin") {
                showStory("A trapdoor opens under you, and you fall to your death. You Lose!");
                showLoseRestartOption();
                currentStep = "died";
            }
        }
        changeBackground(currentStep);
}

// End game functions 
function endGame() {
    alert("The story has ended, thank you for playing!");
    hideElement("story-container");
    showElement("start-screen");
    document.getElementById("user-choice").value = ""; // Clears input
}
function wonGame() {
    changeBackground("escaped");
}
function restartGame() {
    hideElement("story-container");
    showElement("start-screen");
    document.getElementById("user-choice").disabled = false;
    document.getElementById("submit-choice-btn").disabled = false;
    document.getElementById("user-choice").value = ""; // Clear the input
    changeBackground("start");
}

// Event listeners
document.getElementById("start-btn").addEventListener("click", startStory);
document.getElementById("submit-choice-btn").addEventListener("click", handleChoice);