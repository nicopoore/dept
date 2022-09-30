import { auth } from "../middlewares/auth";
import { getLaunches } from "../controllers/launches";

export default (router) => {
  router.get("/launches", auth, getLaunches);
};
