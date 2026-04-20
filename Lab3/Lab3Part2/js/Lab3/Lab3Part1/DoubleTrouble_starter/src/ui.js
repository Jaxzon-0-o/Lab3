// -------------------- UI --------------------
// The ui object handles all interaction with the HTML document.
// It only modifies visual elements and relies on gameLogic for data.

import { NUMBER_OF_DOMINOES } from "./index.js";

export class UI {
    constructor() {
        this.dominoElements = [];
    }

    // Caches domino elements by index for reuse.
    cacheDominoElements() {
        this.dominoElements = [];
        for (let i = 0; i < NUMBER_OF_DOMINOES; i++) {
            this.dominoElements.push(document.getElementById(i));
        }
    }

    // Shows the back for all dominos.
    showAllBacks() {
        // TODO: iterate over dominoElements and show the back for each domino.
        for (let i = 0; i < NUMBER_OF_DOMINOES; i++) {
            this.showDominoBack(i);
        }
    }

    // Shows the back of one domino based on its index.
    showDominoBack(index) {
        let domino = this.dominoElements[index];
        if (!domino) {
            console.warn('ui.showDominoBack: no element for index', index);
            return;
        }
        domino.style.backgroundImage = "url('../pics/dominopic.jpg')";
    }

    // Shows the face of one domino based on its index and domino object.
    showDominoFace(index, dominoObj) {
        // TODO: show the face of the domino at the given index.
        let domino = this.dominoElements[index];
        domino.style.backgroundImage =
            `url('../pics/domino_${dominoObj.left}_${dominoObj.right}.jpg')`;
    }

    // Adds the amber selection highlight to the first-picked domino.
    highlightDomino(index) {
        this.dominoElements[index].classList.add('selected');
    }

    // Disables one domino based on its index.
    disableDomino(index) {
        let domino = this.dominoElements[index];
        domino.onclick = null;
        domino.style.cursor = 'default';
    }

    // Disables all dominos.
    disableAllDominoes() {
        let dominos = this.dominoElements;
        for (const domino of dominos) {
            domino.onclick = null;
            domino.style.cursor = 'default';
        }
        // TODO: iterate over dominoElements and disable each domino.
    }

    // Assigns the clickHandler function to dominos (all dominos by default,
    // or only those still on the board when onlyRemaining is true).
    enableAllDominoes(clickHandler, onlyRemaining = false) {
        for (let i = 0; i < NUMBER_OF_DOMINOES; i++) {
            let el = this.dominoElements[i];
            if (!onlyRemaining || !el.classList.contains('removed')) {
                el.onclick = clickHandler;
                el.style.cursor = 'pointer';
            }
        }
    }

    // Removes one domino from the board by hiding it while keeping its grid space.
    removeDomino(index) {
        let domino = this.dominoElements[index];
        domino.onclick = null;
        domino.style.backgroundImage = 'none';
        domino.classList.add('removed');
    }

    // Updates the score display.
    updateScore(cleared, turns, sum = 0) {
        // TODO: show cleared, turns, and sum in the status element.
        document.getElementById('status').innerHTML =
            `cleared: ${cleared} turns: ${turns} sum: ${sum}`;
    }

    // Replaces the score display with a win message.
    showWin(turns) {
        document.getElementById('status').innerHTML =
            `You cleared the board in ${turns} turn ${turns === 1 ? '' : 's'}!`;
    }
}

// 4-12-2026
// Code Written by Jaxzon Emmons
//ai only used for explaining how some sections of code already written in the file worked/what they did


