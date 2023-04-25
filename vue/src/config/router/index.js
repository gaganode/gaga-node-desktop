import auth_router from "./auth.js";
import main_router from "./main.js";

export default [...main_router, ...auth_router];
