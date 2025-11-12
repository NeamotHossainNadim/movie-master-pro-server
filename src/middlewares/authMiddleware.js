import admin from "../config/firebaseAdmin.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("verifyToken authHeader:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No Authorization header or wrong format");
      return res.status(401).json({ message: "No token provided" });
    }

    const idToken = authHeader.split(" ")[1];
    console.log("🔹 Extracted token (first 20 chars):", idToken?.substring(0, 20) + "...");

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log("decodedToken:", { uid: decodedToken.uid, email: decodedToken.email });

    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying Firebase token:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
