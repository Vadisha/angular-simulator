// 6. Интерфейс, который описывает юзера
interface IUser {
  id: number;
  name: string;
  email: string;
  age?: number;
}

// 7. Интерфейс, расширяющий IUser
interface IAdminUser extends IUser {
  role: string;
  permissions: string[];
}

// 5. Тип для варианта форматирования текста
type TextFormat = "uppercase" | "lowercase" | "capitalize";

// 4. Переменная uploadStatus
let uploadStatus: "loading" | "success" | "error" = "loading";

// 5. Переменная textFormat
let textFormat: TextFormat = "lowercase";

// 10. Массив пользователей и фильтрация
const users: IUser[] = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    age: 25,
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
  },
  {
    id: 3,
    name: "Alice",
    email: "alice2@example.com",
    age: 30,
  },
];

const filteredUsers: IUser[] = users.filter(
  (user: IUser) => user.name === "Alice"
);

// 3. Функция суммы двух чисел
export function sum(a: number, b: number): number {
  return a + b;
}

// 8. Функция форматирования строки
function formatString(value: string, format: TextFormat): string {
  switch (format) {
    case "uppercase":
      return value.toUpperCase();
    case "lowercase":
      return value.toLowerCase();
    case "capitalize":
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}

// 9. Функция, удаляющая символ из строки
function removeChar(value: string, charToRemove: string): string {
  return value.split(charToRemove).join("");
}