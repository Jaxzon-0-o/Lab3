import Die from './Die.js';

export default class DiceSet {
    constructor() {
        this.dice = [];
        for (let i = 0; i < 3; i++) {
            this.dice.push(new Die());
        }
    }

    rollAll() {
        for (const die of this.dice) {
            die.roll();
        }
    }

    holdHighest() {
        let highestDie = null;

        for (const die of this.dice) {
            if (!die.isHeld) {
                if (!highestDie || die.value > highestDie.value) {
                    highestDie = die;
                }
            }
        }

        if (highestDie) {
            highestDie.hold();
        }
    }

    allHeld() {
        return this.dice.every(d => d.isHeld);
    }

    getScore() {
        return this.dice.reduce((sum, d) => sum + d.value, 0);
    }

    reset() {
        for (const die of this.dice) {
            die.reset();
        }
    }
}


//written by Jaxzon Emmons 
//4-20-2026
//ai only used to explain some concepts from original code