import MockAdapter from "axios-mock-adapter";
import axios from "axios";
//let mock be global which also used for other project
export default new MockAdapter(axios);
