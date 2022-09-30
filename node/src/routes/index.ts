import { Router } from "express";
import admin from "./admin";
import launches from "./launches";
import favorites from "./favorites";

export default () => {
  const router = Router();

  admin(router);
  launches(router);
  favorites(router);

  return router;
};
