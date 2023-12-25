// this is a helper class to manage local storage with expiration time
interface ItemWithExpiration {
  value: any;
  expiration: number;
}

export default class LocalStorageManager {
  static setItemWithExpiration(
    key: string,
    value: any,
    expirationTimeInMinutes: number
  ) {
    const now = new Date();
    const item: ItemWithExpiration = {
      value: value,
      expiration: now.getTime() + expirationTimeInMinutes * 60 * 1000,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  static getItemWithExpiration(key: string) {
    if (typeof window !== "undefined") {
      const itemStr = localStorage?.getItem(key);

      if (!itemStr) {
        return null;
      }

      try {
        const item: ItemWithExpiration = JSON.parse(itemStr);

        const now = new Date();
        if (now.getTime() > item.expiration) {
          localStorage.removeItem(key);
          return null;
        }

        return item.value;
      } catch (error) {
        console.error("Error parsing item from localStorage:", error);
        return null;
      }
    }

    return null;
  }
  static removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
