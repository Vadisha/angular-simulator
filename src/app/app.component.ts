import { Component } from '@angular/core';
import './training';
import { Color } from '../enums/Color';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  companyName: string = 'РУМТИБЕТ';
  private collection: any[] = [];

  //3. Далее создать метод, которая сохраняет в локальное хранилище дату последнего захода на страницу. Вызывать ее в конструкторе.
  private readonly LAST_VISIT_STORAGE_KEY: string = 'last-visit-date';
  //4. Далее создать метод, которая сохраняет в localStorage количество заходов на страницу. Вызывать ее в конструкторе.
  private readonly VISIT_COUNT_STORAGE_KEY: string = 'visit-count';

  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
  }

  private saveLastVisitDate(): void {
    if (typeof window === 'undefined' || !window.localStorage) return;

    const currentDateIso = new Date().toISOString();
    window.localStorage.setItem(this.LAST_VISIT_STORAGE_KEY, currentDateIso);
  }

  private saveVisitCount(): void {
    if (typeof window === 'undefined' || !window.localStorage) return;

    const storageData: string | null = window.localStorage.getItem(this.VISIT_COUNT_STORAGE_KEY);
    const currentCount: number = storageData ? Number(storageData) : 0;

    const updatedCount: number = Number.isFinite(currentCount) ? currentCount + 1 : 1;
    window.localStorage.setItem(this.VISIT_COUNT_STORAGE_KEY, String(updatedCount));
  }

  isMainColor(color: Color): boolean {
    return [Color.RED, Color.GREEN, Color.BLUE].includes(color);
  }
}
