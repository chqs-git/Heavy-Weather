import {IHash} from "../IHash";
import {MapHash} from "./MapHash";

export class MapHashLite<T> {
    readonly hash : IHash<T>;
    length : number;
    lengthSlice : number;
    lengthTotal : number;

    constructor(hash: IHash<T>, length: number, lengthSlice: number, lengthTotal: number) {
        this.hash = hash;
        this.length = length;
        this.lengthSlice = lengthSlice;
        this.lengthTotal = lengthTotal;
    }

    static toMapHash<T>(map: MapHashLite<T>): MapHash<T> {
        return new MapHash<T>(map.length, map.lengthSlice, map.lengthTotal, new IHash<T>(map.hash.data))
    }
}