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

export class Collection<T> {
  private items: T[] = [];

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
