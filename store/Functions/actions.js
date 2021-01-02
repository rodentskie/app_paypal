import crypto from "crypto";

export default {
  // delay function
  async delay({ commit }, sec) {
    return new Promise((resolve) => setTimeout(resolve, sec * 1000));
  },
  async decrypt({ commit }, text) {
    try {
      const algorithm = process.env.ALGORITHM;
      const password = process.env.ENCRYPTION_KEY;
      const iv = process.env.IV;
      let str = null;
      if (text) {
        const decipher = crypto.createDecipheriv(algorithm, password, iv);
        const dec = decipher.update(text, "hex", "utf8");
        str = dec;
      }
      if (!str) return text;
      return str;
    } catch (e) {
      return text;
    }
  },

  async encrypt({ commit }, text, isLower) {
    const algorithm = process.env.ALGORITHM;
    const password = process.env.ENCRYPTION_KEY;
    const iv = process.env.IV;

    let str = null;
    if (text) {
      text = text.toString();
      if (isLower) text = text.toLowerCase(); // convert to lower case
      const cipher = crypto.createCipheriv(algorithm, password, iv);
      let encrypted = cipher.update(text, "utf8", "hex");
      encrypted += cipher.final("hex");
      str = encrypted;
    }
    return str;
  },
};
