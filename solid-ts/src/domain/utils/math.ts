import {Vector2, Vector3} from "three";

export function map (A: Vector3, B: Vector3, fun: (a: number, b: number) => number) {
    return new Vector3(fun(A.x, B.x), fun(A.y, B.y), fun(A.z, B.z));
}

export function distanceBetweenPoints(A: Vector2, B: Vector2): number {
    const dx = B.x - A.x;
    const dy = B.y - A.y;

    return Math.sqrt(dx * dx + dy * dy);
}

export function distanceBetween3DPoints(A: Vector3, B: Vector3): number {
    const dx = B.x - A.x;
    const dy = B.y - A.y;
    const dz = B.z - A.z;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
