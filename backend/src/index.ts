import app from "./api/app.init";
import { MongoConnect } from "./api/shared/db/mongodb/connection";
import { logger } from "./api/shared/utils/logger";

MongoConnect()
  .then(() => {
    app.listen();
  })
  .catch((err) => {
    logger.error(err);
  });
