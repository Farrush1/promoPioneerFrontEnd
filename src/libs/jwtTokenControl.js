import * as jose from "jose";

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET),
};

export const isAuthenticated = async req => {
  const token = req.cookies.get("accessToken")?.value;

  if (token) {
    try {
      const decoded = await jose.jwtVerify(token, jwtConfig.secret);
      return decoded;
    } catch (error) {
      console.error("Authenticated error: ", error);
      return false;
    }
  } else {
    return false;
  }
};
