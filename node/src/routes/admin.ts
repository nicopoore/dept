import { generateToken } from "../controllers/admin";

export default (router) => {
  router.post("/admin/token", generateToken);
};
