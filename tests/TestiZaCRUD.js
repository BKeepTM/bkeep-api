const Hive = require("../model/hiveModel");
const db = require("../util/database");

async function test() {
    const hive = new Hive(1, "Testni panj", "Ljubljana", "lr", "online", 1, 1);

    await hive.insert();
    console.log("Insert complete");

    //const [all] = await Hive.getAll();
    //console.log("All hives:", all);

    //hive.name = "Posodobljen panj";
    //await hive.update();
    //console.log("Update complete");

    //const [one] = await Hive.getById(1);
    //console.log("Hive by ID:", one);

    //await Hive.deleteById(1);
    //console.log("Deleted");

    db.end();
}

test().catch(err => console.error(err));
