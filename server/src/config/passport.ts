import { Strategy, ExtractJwt } from "passport-jwt";
import { model } from "mongoose";
import { readFileSync } from "fs";
import { join } from "path";
const User = model("User");
import { PassportStatic } from "passport";

const pathToKey = join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = readFileSync(pathToKey, "utf8");

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ["RS256"],
};

// app.js will pass the global passport object here, and this function will configure it
export default function setPassport(passport: PassportStatic) {
    // The JWT payload is passed into the verify callback
    passport.use(
        new Strategy(options, function (jwt_payload, done) {
            console.log(jwt_payload);

            // We will assign the `sub` property on the JWT to the database ID of user
            User.findOne({ _id: jwt_payload.sub }, function (err, user) {
                // This flow look familiar?  It is the same as when we implemented
                // the `passport-local` strategy
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }),
    );
}
