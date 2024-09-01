interface CacheItem<T> {
    value: T;
    expires: number;
}
  
class Cache {
    private cache: Map<string, CacheItem<any>>;

    constructor() {
        this.cache = new Map<string, CacheItem<any>>();
    }

    set<T>(key: string, value: T, duration: number): void {
        this.cache.set(key, { value, expires: Date.now() + duration * 1000 });
    }

    get<T>(key: string): T | null {
        const cachedItem = this.cache.get(key);
        
        if (cachedItem && Date.now() < cachedItem.expires) {
        return cachedItem.value;
        }

        this.cache.delete(key);
        return null;
    }
}
  
const cache = new Cache();
  
export function setCache<T>(key: string, value: T, duration: number): void {
    cache.set(key, value, duration);
}

export async function getCache<T>(key: string): Promise<T | null> {
    return cache.get<T>(key);
}
  