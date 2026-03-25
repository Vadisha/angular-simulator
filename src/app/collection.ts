//5. Создать файл collection.ts, который реализует внутри себя класс Collection, работающий с любым типом данных. Внутри реализовать методы:

//  - получить определенный элемент коллекции
//  - очистить коллекцию
//  - удалить определенный элемент коллекции
//  - заменить определенный элемент коллекции

//Реализовать коллекцию с двумя разными источниками данных

export interface CollectionDataSource<T> {
  getAll(): T[];
  get(index: number): T | undefined;
  clear(): void;
  delete(index: number): void;
  replace(index: number, value: T): void;
}

export class InMemoryCollectionSource<T> implements CollectionDataSource<T> {
  private items: T[];

  constructor(initialItems: T[] = []) {
    this.items = [...initialItems];
  }

  getAll(): T[] {
    return [...this.items];
  }

  get(index: number): T | undefined {
    return this.items[index];
  }

  clear(): void {
    this.items = [];
  }

  delete(index: number): void {
    if (index < 0 || index >= this.items.length) return;
    this.items.splice(index, 1);
  }

  replace(index: number, value: T): void {
    if (index < 0 || index >= this.items.length) return;
    this.items[index] = value;
  }
}

export class LocalStorageCollectionSource<T> implements CollectionDataSource<T> {
  private storageKey: string;

  constructor(storageKey: string, initialItems: T[] = []) {
    this.storageKey = storageKey;

    // Инициализируем хранилище один раз, если его ещё нет
    if (typeof window !== 'undefined' && !window.localStorage.getItem(this.storageKey)) {
      window.localStorage.setItem(this.storageKey, JSON.stringify(initialItems));
    }
  }

  private load(): T[] {
    if (typeof window === 'undefined') return [];

    const raw = window.localStorage.getItem(this.storageKey);
    if (!raw) return [];

    try {
      const parsed = JSON.parse(raw) as T[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private save(items: T[]): void {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  getAll(): T[] {
    return this.load();
  }

  get(index: number): T | undefined {
    const items = this.load();
    return items[index];
  }

  clear(): void {
    this.save([]);
  }

  delete(index: number): void {
    const items = this.load();
    if (index < 0 || index >= items.length) return;

    items.splice(index, 1);
    this.save(items);
  }

  replace(index: number, value: T): void {
    const items = this.load();
    if (index < 0 || index >= items.length) return;

    items[index] = value;
    this.save(items);
  }
}

export class Collection<T> {
  constructor(private source: CollectionDataSource<T>) {}

  getAll(): T[] {
    return this.source.getAll();
  }

  get(index: number): T | undefined {
    return this.source.get(index);
  }

  clear(): void {
    this.source.clear();
  }

  delete(index: number): void {
    this.source.delete(index);
  }

  replace(index: number, value: T): void {
    this.source.replace(index, value);
  }
}