import { MapArrayLite } from "./MapArrayLite.ts";
import { Vector3 } from "three";
import { VoxelMap } from "./VoxelMap.ts";

/**
 [MapArray] is a implementation of the **VoxelMap** interface, that holds data using an 
 *Array* data structure.
*/
export class MapArray<T> implements VoxelMap<T> {
    private array : Array<T>;
    length : number;
    lengthSlice : number;
    lengthTotal : number;

    constructor(length: number, lengthSlice: number = length * length, lengthTotal: number = length * lengthSlice, array: Array<T> = new Array<T>(lengthTotal)) {
        this.array = array;
        this.length = length;
        this.lengthSlice = lengthSlice;
        this.lengthTotal = lengthTotal;
    }

    get (x: number, y: number, z: number): T {
        const idx = x + y * this.length + z * this.lengthSlice;
        return this.array[idx];
    }

    getFromPos (coord: Vector3): T {
        const idx = coord.x + coord.y * this.length + coord.z * this.lengthSlice;
        return this.array[idx];
    }

    getFromIndex (index: number): T {
        return this.array[index]
    }

    add (x: number, y: number, z: number, value: T) {
        const idx = x + y * this.length + z * this.lengthSlice;
        this.array[idx] = value;
    }

    addFromPos (coord: Vector3, value: T) {
        const idx = coord.x + coord.y * this.length + coord.z * this.lengthSlice;
        this.array[idx] = value;
    }

    addFromIndex (index: number, value: T) {
        this.array[index] = value;
    }

    // function signature must be (value, index)
    map (fn: (index: number, value: T) => T) {
        this.array = this.array.map((value: T, index) => fn(index, value))
    }

    // function signature must be (value, index)
    mapTo (fn: (index: number, value: T) => T): MapArray<T> {
        return new MapArray<T>(this.length, this.lengthSlice, this.lengthTotal, this.array.map((value: T, index) => fn(index, value)))
    }

    toMapLite(): MapArrayLite<T> {
        return new MapArrayLite<T>(this.array, this.length, this.lengthSlice, this.lengthTotal)
    }
}

