import auth_router from "./auth.js";
import main_router from "./main.js";

export default [...auth_router, ...main_router];
