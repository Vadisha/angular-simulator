//5. Создать файл collection.ts, который реализует внутри себя класс Collection, работающий с любым типом данных. Внутри реализовать методы:

//  - получить определенный элемент коллекции
//  - очистить коллекцию
//  - удалить определенный элемент коллекции
//  - заменить определенный элемент коллекции

//Реализовать коллекцию с двумя разными источниками данных
export interface DataSource<T> {
  getAll(): T[];
  get(index: number): T | undefined;
  clear(): void;
  delete(index: number): void;
  replace(index: number, value: T): void;
}

export class InMemorySource<T> implements DataSource<T> {
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

// Для storage отдельный класс не нужен: возвращаем объект, реализующий DataSource<T>
export function createLocalStorageDataSource<T>(
  storageKey: string,
  initialItems: T[] = []
): DataSource<T> {
  // Инициализируем хранилище один раз, если его ещё нет
  if (typeof window !== 'undefined' && window.localStorage && !window.localStorage.getItem(storageKey)) {
    window.localStorage.setItem(storageKey, JSON.stringify(initialItems));
  }

  const load = (): T[] => {
    if (typeof window === 'undefined' || !window.localStorage) return [];

    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return [];

    try {
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as T[]) : [];
    } catch {
      return [];
    }
  };

  const save = (items: T[]): void => {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  };

  return {
    getAll: () => load(),
    get: (index: number) => load()[index],
    clear: () => save([]),
    delete: (index: number) => {
      const items = load();
      if (index < 0 || index >= items.length) return;
      items.splice(index, 1);
      save(items);
    },
    replace: (index: number, value: T) => {
      const items = load();
      if (index < 0 || index >= items.length) return;
      items[index] = value;
      save(items);
    },
  };
}
export class Collection<T> {
  constructor(private source: DataSource<T>) {}

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