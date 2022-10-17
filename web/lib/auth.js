export function isLoggedIn() {
  return !!localStorage.getItem("user_id");
}

export function getCurrentUser() {
  return localStorage.getItem("user_id");
}
