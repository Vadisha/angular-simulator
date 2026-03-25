import { Component } from '@angular/core';
import './training'
import { Color } from '../enums/Color';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  companyName = 'РУМТИБЕТ';

  //3. Далее создать метод, которая сохраняет в локальное хранилище дату последнего захода на страницу. Вызывать ее в конструкторе.
  
  private readonly lastVisitStorageKey = 'lastVisitDate';

  constructor() {
    this.saveLastVisitDate();
  }

 
  private saveLastVisitDate(): void {
    if (typeof window === 'undefined' || !window.localStorage) return;

    const nowIso = new Date().toISOString();
    window.localStorage.setItem(this.lastVisitStorageKey, nowIso);
  }


  isMainColor(color: Color): boolean {
    return [Color.Red, Color.Green, Color.Blue].includes(color);
  }
}

//4. Далее создать метод, которая сохраняет в localStorage количество заходов на страницу.  Вызывать ее в конструкторе.

private readonly visitCountStorageKey = 'visitCount';

constructor() {
  this.saveLastVisitDate();
  this.saveVisitCount();
}

private saveVisitCount(): void {
  if (typeof window === 'undefined' || !window.localStorage) return;

  const raw = window.localStorage.getItem(this.visitCountStorageKey);
  const prev = raw ? Number(raw) : 0;

  const next = Number.isFinite(prev) ? prev + 1 : 1;
  window.localStorage.setItem(this.visitCountStorageKey, String(next));
}
