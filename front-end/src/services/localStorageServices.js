export const readStorage = (token) => {
  const storage = JSON.parse(localStorage.getItem(token));
  return storage;
};

export const SaveStorage = (token, data) => {
  localStorage.setItem(token, JSON.stringify(data));
};

export const removeStorageItem = (token) => () => (
  localStorage.removeItem(token)
);

export const clearStorage = () => localStorage.clear();
