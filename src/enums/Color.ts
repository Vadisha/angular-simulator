//2. Создать папку enums в папке src, в ней файл Color.ts, который экспортирует enum различных цветов (обязательно красный, зеленый, синий (RGB)). Создать метод внутри app.component, который проверяет, является ли переданный цвет основным, а основных у нас 3 цвета (rgb) и возвращает нам true/false

export enum Color {
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
  BLACK = 'black',
  WHITE = 'white',
}

