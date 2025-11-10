import { clearJwtCookie } from "../utils/jwt";

export default defineEventHandler(async (event) => {
  clearJwtCookie(event);
  return { success: true };
});
