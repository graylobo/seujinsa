import { request } from ".";

const PATH = "/hello";

function getMenus() {
  return request({ method: "get", url: PATH });
}

export { getMenus };
