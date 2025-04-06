import { Container } from "inversify";
import HEALTH_TYPES from "./types/HealthTypes";
import HealthController from "./controllers/HealthController";
import HealthRouter from "./routes/HealthRouter";

// InversifyJS container for health-related dependencies.
const healthContainer = new Container();

healthContainer.bind<HealthController>(HEALTH_TYPES.HealthController).to(HealthController);
healthContainer.bind<HealthRouter>(HEALTH_TYPES.HealthRouter).to(HealthRouter);

const healthRouter = healthContainer.get<HealthRouter>(HEALTH_TYPES.HealthRouter);

export default healthRouter;
