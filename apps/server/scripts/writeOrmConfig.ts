import fs = require("fs");

import { typeOrmConfig } from "../src/config/typeOrm.config";

fs.writeFileSync("ormconfig.json", JSON.stringify(typeOrmConfig(), null, 2));
