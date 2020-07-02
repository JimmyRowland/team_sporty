import { pbkdf2Sync, randomBytes } from "crypto";
import { sign } from "jsonwebtoken";
import { readFileSync } from "fs";
import { join } from "path";
import { Response } from "express";
// import { User } from "../entities/User";
import { salthash } from "../interfaces/interfaces";

const pathToKey = join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = readFileSync(pathToKey, "utf8");

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 *
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 *
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
export function validPassword(password: string, hash: string, salt: string) {
    const hashVerify = pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
    return hash === hashVerify;
}

/**
 *
 * @param {*} password - The password string that the user inputs to the password field in the register form
 *
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 *
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */
export function genPassword(password: string): salthash {
    const salt = randomBytes(32).toString("hex");
    const genHash = pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");

    return {
        salt: salt,
        hash: genHash,
    };
}

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
export function issueJWT(user: any): string {
    const _id = user._id;

    const expiresIn = "7d";

    const payload = {
        sub: _id,
        iat: Date.now(),
    };

    const signedToken = sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: "RS256" });

    return signedToken;
}

export function sendRefreshToken(res: Response, token: string): void {
    res.cookie("jid", token, {
        httpOnly: true,
        path: "/refresh_token",
    });
}
