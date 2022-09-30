import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res
        .status(400)
        .send({ meesage: "Authorization header is needed" });
    }

    const data: any = jwt.verify(token, jwtSecretKey);
    if (!data) {
      return res.status(401).send({ meesage: "Invalid Authorization token" });
    }

    req.currentUserId = data.userId;

    return next();
  } catch (error) {
    return res.status(401).send({ meesage: "Invalid Authorization token" });
  }
};
