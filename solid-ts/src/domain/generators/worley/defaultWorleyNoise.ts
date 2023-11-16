import { Vector3 } from "three";
import { create } from "random-seed";
import {distanceBetween3DPoints} from "../../utils/math";
import {randomIntFromInterval} from "../../utils/random";
import {MapArray} from "../../utils/voxels/MapArray";

export function createWorleyNoise (resolution: number, numCellsAxis: number, seed: string = "default") : MapArray<number> {
    const cellSize = resolution / numCellsAxis;
    const numBorderCellAxis = numCellsAxis + 2;
    const numBorderCellAxisSqr = numBorderCellAxis * numBorderCellAxis;
    const points = createPointsArray(numCellsAxis, cellSize, seed);
    const map = new MapArray<number>(resolution);
    
    for(let z = 0; z < resolution; z++) {
        const zRes = z * map.lengthSlice
        const zVal = (Math.floor(z / cellSize) + 1) * numBorderCellAxisSqr
        for(let y = 0; y < resolution; y++) {
            const yRes = y * map.length
            const yVal = (Math.floor(y / cellSize) + 1) * numBorderCellAxis
            for(let x = 0; x < resolution; x++) {
                const cellId = (Math.floor(x / cellSize) + 1) + yVal + zVal;

                const pos = new Vector3(x, y, z)
                map.addFromIndex(x + yRes + zRes, checkNearCells(pos, cellSize, cellId, points));
            }
        }
    }

    return map;
}

function checkNearCells(pos: Vector3, cellSize: number, cellId: number, points: MapArray<Vector3>) {
    const neighbours = [-1, 0, 1];
    let minDist = cellSize * 2;

    for(const z of neighbours) {
        const zVal = z * points.lengthSlice
        for (const y of neighbours) {
            const yVal = y * points.length
            for (const x of neighbours) {
                const distance = distanceBetween3DPoints(pos, points.getFromIndex(cellId + x + yVal + zVal));
                minDist = Math.min(distance, minDist);
            }
        }
    }
    return minDist / (cellSize * 2);
}

export function createPointsArray(numCellsAxis: number, cellSize: number, seed : string = "default") : MapArray<Vector3> {
    const numCellsBorder = numCellsAxis + 2;
    const points = new MapArray<Vector3>(numCellsBorder);
    const generator = create(seed);

    // create initial worley points
    for(let z = 0; z < numCellsAxis; z++)
        for(let y = 0; y < numCellsAxis; y++)
            for(let x = 0; x < numCellsAxis; x++) {
                const width  = x * cellSize;
                const height = y * cellSize;
                const depth  = z * cellSize;
                const offset = new Vector3( randomIntFromInterval(0, cellSize, generator),
                                            randomIntFromInterval(0, cellSize, generator),
                                            randomIntFromInterval(0, cellSize, generator));
                points.add(x + 1, y + 1, z + 1, new Vector3(width + offset.x, height + offset.y, depth + offset.z));
            }
    // replace empty tiles with the inverse tiles to create seamless array
    for (let z = 0; z < numCellsBorder; z++)
        for (let y = 0; y < numCellsBorder; y++)
            for (let x = 0; x < numCellsBorder; x++) {
                if (y == 0 || y == numCellsAxis + 1 || x == 0 || x == numCellsAxis + 1 || z == 0 || z == numCellsAxis + 1)
                    points.add(x, y, z, inverseCell(new Vector3(x - 1, y - 1, z - 1), points, numCellsAxis, cellSize));
            }

    return points
}

function inverseCell(cell: Vector3, points: MapArray<Vector3>, numCellsAxis: number, cellSize: number) {
    const x = cell.x >= 0 && cell.x < numCellsAxis
    const y = cell.y >= 0 && cell.y < numCellsAxis
    const z = cell.z >= 0 && cell.z < numCellsAxis

    const newCell = new Vector3(x ? cell.x : numCellsAxis - Math.abs(cell.x),
                                y ? cell.y : numCellsAxis - Math.abs(cell.y),
                                z ? cell.z : numCellsAxis - Math.abs(cell.z))


    let offset = points.get(newCell.x + 1, newCell.y + 1,newCell.z + 1)
    offset = new Vector3(offset.x, offset.y, offset.z) // new copy of object

    if (!x) offset.x += ((cell.x <= 0) ? -cellSize : cellSize) * numCellsAxis

    if (!y) offset.y += ((cell.y <= 0) ? -cellSize : cellSize) * numCellsAxis

    if (!z) offset.z += ((cell.z <= 0) ? -cellSize : cellSize) * numCellsAxis

    return offset
}

export function increaseMapSize (map: MapArray<number>, newResolution: number) : MapArray<number> {
    const output = new MapArray<number>(newResolution);

    for(let z = 0; z < newResolution; z++) {
        const valZ = z % map.length;
        for (let y = 0; y < newResolution; y++) {
            const valY = y % map.length
            for (let x = 0; x < newResolution; x++) {
                output.add(x, y, z, map.get(x % map.length, valY, valZ));
            }
        }
    }
    
    return output;
}
