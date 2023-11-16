import {MapArray} from "./MapArray";

export class MapArrayLite<T> {
    readonly array: Array<T>
    length : number;
    lengthSlice : number;
    lengthTotal : number;

    constructor(array: Array<T>, length: number, lengthSlice: number, lengthTotal: number) {
        this.array = array;
        this.length = length;
        this.lengthSlice = lengthSlice;
        this.lengthTotal = lengthTotal;
    }

    static toMapArray<T>(map: MapArrayLite<T>): MapArray<T> {
        return new MapArray<T>(map.length, map.lengthSlice, map.lengthTotal, map.array)
    }
}