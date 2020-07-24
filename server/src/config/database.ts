import { connect, connection } from "mongoose";
import "dotenv/config";

export default function connectDatabase() {
    console.log("process.env",process.env);
    const devConnection: string | undefined = process.env.DB_STRING;
    const prodConnection: string | undefined = process.env.DB_STRING_PROD;

    // Connect to the correct environment database
    if (process.env.NODE_ENV === "production" && prodConnection) {
        connect(prodConnection, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        connection.on("connected", () => {
            console.log("Database connected");
        });
    } else {
        if (devConnection) {
            connect(devConnection, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            connection.on("connected", () => {
                console.log("Database connected");
            });
        } else {
            throw new Error("devConnection is undefined");
        }
    }
}
