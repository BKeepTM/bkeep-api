import Hive from "../model/hiveModel.js";
import HiveWeight from "../model/hiveWeightModel.js";
import Location from "../model/locationModel.js";
import Notes from "../model/notesModel.js";
import User from "../model/userModel.js";
import connection from "../util/database.js";
const db = connection;

async function testHive() {
    console.log("Testing Hive model...");

    // Insert a new Hive
    const hive = new Hive(15, "Zabavni panj", "Ljubljana", "lr", "online", 1, 1);
    await hive.insert();
    console.log("Hive Insert complete");

    // Fetch all hives
    let results = await Hive.getAll();
    console.log("All Hives:", results);

    // Update the Hive
    hive.name = "Posodobljen panj";
    console.log("Updating Hive with values:", hive);
    await hive.update();
    console.log("Hive Update complete");

    // Get Hive by ID
    const hiveById = await Hive.getById(13);
    console.log("Hive with ID 13:", hiveById);

}

async function testHiveWeight() {
    console.log("Testing HiveWeight model...");

    // Insert a new HiveWeight
    const hiveWeight = new HiveWeight(13, 20.5, "2025-04-27 12:00:00", 2);
    await hiveWeight.insert();
    console.log("HiveWeight Insert complete");

    // Fetch all HiveWeights
    const weights = await HiveWeight.getAll();
    console.log("All HiveWeights:", weights);

    // Delete HiveWeight by ID
    await HiveWeight.deleteById(13);
    console.log("HiveWeight with ID 13 Deleted");
}

async function testLocation() {
    console.log("Testing Location model...");

    // Insert a new Location
    const location = new Location(13, 14.514, 46.056);
    await location.insert();
    console.log("Location Insert complete");

    // Fetch all Locations
    const locations = await Location.getAll();
    console.log("All Locations:", locations);

    // Delete Location by ID
    await Location.deleteById(13);
    console.log("Location with ID 13 Deleted");
}

async function testNotes() {
    console.log("Testing Notes model...");

    // Insert a new Note
    const note = new Notes(13, "Important observation", "2025-04-27 12:00:00");
    await note.insert();
    console.log("Note Insert complete");

    // Fetch all Notes
    const notes = await Notes.getAll();
    console.log("All Notes:", notes);

    // Delete Note by ID
    await Notes.deleteById(13);
    console.log("Note with ID 13 Deleted");
}

async function testUser() {
    console.log("Testing User model...");

    // Insert a new User
    const user = new User(13, "johndoe", "password123", "johndoe@example.com", "default", 2);
    await user.insert();
    console.log("User Insert complete");

    // Fetch all Users
    const users = await User.getAll();
    console.log("All Users:", users);

    // Delete User by ID
    await User.deleteById(13);
    console.log("User with ID 13 Deleted");
}

async function runTests() {
    try {
        //await testHive();
        await testHiveWeight();
        await testLocation();
        await testNotes();
        await testUser();

        console.log("All tests completed successfully.");
    } catch (err) {
        console.error("Error during tests:", err);
    } finally {
        db.end();
    }
}

runTests().catch(err => console.error(err));
