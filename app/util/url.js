import { emitter } from "./mitt";

export const u = (path) =>
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === "development"
    ? `http://localhost:3000${path}`
    : path;

export const authFetch = async (url, options, redirect = true) => {
  const token = localStorage.getItem("token");
  const res = await fetch(u(url), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401 && redirect) {
    localStorage.removeItem("token");
    window.logout && window.logout();
    emitter.emit("logout");
  }
  return res;
};

export const authFetchWithoutContentType = async (url, options) => {
  const token = localStorage.getItem("token");
  const res = await fetch(u(url), {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.logout && window.logout();
    emitter.emit("logout");
  }
  return res;
};
