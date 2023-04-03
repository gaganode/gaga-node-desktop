import example_lang from "./example/example_lang";
import main_lang from "./main/main_lang";

import lang from "@/lang/lang";

///merge all langs
export default lang.merge_lang(example_lang, main_lang);
