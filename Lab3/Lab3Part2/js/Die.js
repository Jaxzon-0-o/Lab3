export default class Die {
    constructor() {
        this.value = 1;
        this.isHeld = false;
    }

    roll() {
        if (!this.isHeld) {
            this.value = Math.floor(Math.random() * 6) + 1;
        }
    }

    hold() {
        this.isHeld = true;
    }

    reset() {
        this.value = 1;
        this.isHeld = false;
    }
}


//written by Jaxzon Emmons 
//4-17-2026
//ai only used to explain some concepts from original code