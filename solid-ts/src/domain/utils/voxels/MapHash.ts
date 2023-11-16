import { IHash } from "../IHash";
import {MapHashLite} from "./MapHashLite";
import {Vector3} from "three";
import { VoxelMap } from "./VoxelMap.ts";

/**
 [MapHash] is a implementation of the **VoxelMap** interface, that holds data using an 
 *HashMap* data structure.
*/
export class MapHash<T> implements VoxelMap<T> {
    private readonly hash : IHash<T>;
    length : number;
    lengthSlice : number;
    lengthTotal : number;
    
    constructor(length: number, lengthSlice: number = length * length, lengthTotal: number = length * lengthSlice, hash: IHash<T> = new IHash<T>()) {
        this.hash = hash;
        this.length = length;
        this.lengthSlice = lengthSlice;
        this.lengthTotal = lengthTotal;
    }

    get (x: number, y: number, z: number): T {
        const idx = x + y * this.length + z * this.lengthSlice;
        return this.hash.get(idx);
    }

    getFromPos (coord: Vector3): T {
        const idx = coord.x + coord.y * this.length + coord.z * this.lengthSlice;
        return this.hash.get(idx);
    }

    getFromIndex (index: number): T {
        return this.hash.get(index)
    }

    add (x: number, y: number, z: number, value: T) {
        const idx = x + y * this.length + z * this.lengthSlice;
        this.hash.put(idx, value);
    }

    addFromPos (coord: Vector3, value: T) {
        const idx = coord.x + coord.y * this.length + coord.z * this.lengthSlice;
        this.hash.put(idx, value);
    }

    addFromIndex (index: number, value: T) {
        this.hash.put(index, value)
    }

    // function signature must be (value, index)
    map (fn: (index: number, value: T) => T) {
        this.hash.map(fn)
    }

    // function signature must be (value, index)
    mapTo (fn: (index: number, value: T) => T): MapHash<T> {
        const map = new MapHash<T>(this.length, this.lengthSlice, this.lengthTotal)
        this.hash.for((index, value) => { map.addFromIndex(index, fn(index, value)) })
        return map
    }

    toMapLite(): MapHashLite<T> {
        return new MapHashLite(this.hash, this.length, this.lengthSlice, this.lengthTotal)
    }
}
