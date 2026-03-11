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
let uploadStatus: "loading" | "success" | "error";

// 5. Переменная textFormat
let textFormat: TextFormat;

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
  (user: IUser): boolean => user.name === "Alice"
);

// 3. Функция суммы двух чисел
export function sum(a: number, b: number): number {
  const result: number = a + b;
  return result;
}

// 8. Функция форматирования строки
function formatString(value: string, format: TextFormat): string {
  if (format === "uppercase") {
    return value.toUpperCase();
  }

  if (format === "lowercase") {
    return value.toLowerCase();
  }

  if (format === "capitalize") {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  return value;
}

// 9. Функция, удаляющая символ из строки
function removeChar(value: string, charToRemove: string): string {
  return value.split(charToRemove).join("");
}