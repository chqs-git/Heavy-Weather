///
/// Simple Hash Map implementation with Generic values.
///
export class IHash<V> {
    readonly data: Record<number, V>

    constructor(data: Record<number, V> = {}) {
        this.data = data
    }

    put(index: number, value: V) {
        this.data[index] = value
    }

    // can return null
    get(index: number): V {
        return this.data[index]
    }

    map(fn: (index: number, value: V) => V) {
        this.for((index, value) => this.put(+index, fn(+index, value)))
    }

    for(fn: (index: number, value: V) => any) {
        for (const [index, value] of Object.entries(this.data)) {
            fn(+index, value)
        }
    }
}
