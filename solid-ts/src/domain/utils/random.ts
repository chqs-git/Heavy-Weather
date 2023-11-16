import { RandomSeed } from "random-seed";

// return a *random* integer between a [min, max] values from a [RandomSeed] generator.
export function randomIntFromInterval(min = 0, max = 1, generator: RandomSeed) { // min and max included
    return generator.intBetween(min, max);
}
