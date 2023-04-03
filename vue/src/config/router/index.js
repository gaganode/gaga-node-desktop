import desktop_router from "./desktop";
import example_router from "./example";
import auth_router from "./auth.js";
import main_router from "./main.js";

export default [...desktop_router, ...example_router, ...auth_router, ...main_router];
