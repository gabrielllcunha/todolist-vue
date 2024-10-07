import { server } from "./config/server";

import dotenv from "dotenv";

dotenv.config();

server.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
