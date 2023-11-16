import { Vector3 } from "three";
import { create, RandomSeed } from "random-seed";
import { MapHash } from "../../utils/voxels/MapHash.ts";
import { Queue } from "../../utils/queue.ts";
import {randomIntFromInterval} from "../../utils/random";

// algorithm constants
const edge = 10;
const visited = -1;
const offset = [ 1, 0, 0, -1, 0, 0];
const bias = 2
const falloff = .9;

// Arrow Functions
const inBounds = (x: number, length: number) => x >= 0 && x < length;
const isWithinBounds = (v: Vector3, length: number) => inBounds(v.x, length) && inBounds(v.y, length) && inBounds(v.z, length);

export function CloudGenerator (
    pos = new Vector3(75, 75, 75),
    length = 144,
    decay = .98,
    numIslands = 1,
    seed = "default"
    ) : MapHash<number> {
        // Create Empty Map
        const map = new MapHash<number>(length);
        // initialize array
        const altitude = Array<Vector3>()
        // Create main generator
        const mainGen = create(seed);
        // Create islands generator
        const islandGen = create(seed);
        // calculate anvilHeight
        const anvilHeight = length - 100

        // Main cloud
        cloudFill(pos, 100, decay, pos.y, anvilHeight, mainGen, altitude, map);

        // Cloud islands
        for(let i = 1; i <= numIslands; i++) {
            setTimeout(() => {
                const height = biasedRandomIntFromInterval(0, altitude.length - 1, bias, islandGen);
                //const outline = findOutline(altitude[height], map);
                //const point = outline[randomIntFromInterval(0, outline.length - 1, mainGen)];
                const newChance = 100 - (100 / numIslands) * i
                cloudFill(pos, newChance, decay, pos.y, anvilHeight, mainGen, altitude, map);
            }, 1000 * i)
        }

        return map;
}

function cloudFill (
    center: Vector3, chance: number, decay: number, falloffHeight: number, anvilHeight: number,
    generator: RandomSeed, altitude: Array<Vector3>, map: MapHash<number>
    ) : MapHash<number> {

        const queue = new Queue<Vector3>();
        const queueP = new Queue<number>();
        queue.enqueue(center);
        queueP.enqueue(chance);

        while(!queue.isEmpty) {
            const pos = queue.dequeue();
            const cellChance = queueP.dequeue();
            map.addFromPos(pos, 1);

            const random = randomIntFromInterval(0, 100, generator);
            if (cellChance >= random) {
                for(let i = 0; i < 6; i++) {
                    const newPos = new Vector3(
                        pos.x + offset[i % 6],
                        pos.y + offset[(i + 1) % 6],
                        pos.z + offset[(i + 2) % 6]);

                    if (isWithinBounds(newPos, map.length - edge) && map.getFromPos(newPos) == null) {
                        queue.enqueue(newPos);
                        const height = newPos.y - center.y;
                        if (altitude[height] == null) altitude[height] = newPos;
                        queueP.enqueue(calculateChance(cellChance, decay, newPos.y, falloffHeight, /*anvilHeight, map.length*/));

                        map.addFromPos(newPos, visited);
                    }
                }
            }
        }

    return map;
}

function calculateChance(
    chance: number,
    decay: number,
    height: number,
    falloffHeight: number,
    //anvilHeight: number,
    //length: number
): number {
    /*if (height >= anvilHeight) {
        const val = curveFn(height / (length - edge * 2), .25)
        return 70
    } else */
    if (height >= falloffHeight) {
        return chance * decay
    } else {
        return chance * decay * falloff
    }
}

function findOutline(start: Vector3, map: MapHash<number>): Vector3[] {
    const queue = new Queue<Vector3>();
    const auxMap = new MapHash(map.length, map.lengthSlice, map.lengthTotal)
    const outline = Array<Vector3>()

    queue.enqueue(start)
    while(!queue.isEmpty) {
        const pos: Vector3 = queue.dequeue();

        for(let i = 0; i < 6; i++) {
            const newPos = new Vector3(
                pos.x + offset[i % 6],
                pos.y + offset[(i + 1) % 6],
                pos.z + offset[(i + 2) % 6]);

            if (isWithinBounds(newPos, map.length) && auxMap.getFromPos(newPos) == null) {
                auxMap.addFromPos(newPos, 1)

                if (map.getFromPos(newPos) == 1) {
                    queue.enqueue(newPos)
                } else {
                    outline[outline.length] = newPos
                }
            }
        }
    }

    return outline
}

function biasedRandomIntFromInterval(min: number, max: number, bias: number, generator: RandomSeed): number {
    const range = max - min
    const random = randomIntFromInterval(0, 1, generator);
    return curveFn(random, bias) * range
}

function curveFn(x: number, bias: number): number {
    return x ^ (1 / bias)
}
