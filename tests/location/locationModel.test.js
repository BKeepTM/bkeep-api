import assert from 'assert';
import Location from '../../model/locationModel.js';
import connection from '../../util/database.js';

describe('Location model tests', function () {
  let insertedId;

  const testLocation = new Location(
    null, 
    45.0, 
    15.0 
  );

  after(async () => {
    // Cleanup if any leftover
    if (insertedId) {
      await Location.deleteById(insertedId);
    }
  });

  it('should insert a new location', async function () {
    const [result] = await testLocation.insert();
    insertedId = result.insertId;  
    assert.ok(insertedId > 0); 
  });

  it('should get location by id', async function () {
    const rows = await Location.getById(insertedId);
    assert.strictEqual(rows.length, 1); 
    assert.strictEqual(rows[0].longitude, 45.0);  
    assert.strictEqual(rows[0].latitude, 15.0);  
  });

  it('should get all locations', async function () {
    const allLocations = await Location.getAll();
    assert.ok(Array.isArray(allLocations)); 
    assert.ok(allLocations.length >= 1);  
  });

  it('should update location', async function () {
    testLocation.id = insertedId;  
    testLocation.longitude = 46.0;  
    testLocation.latitude = 16.0;   

    assert.ok(insertedId, 'Insert ID should be set before updating');

    await testLocation.update();  

    const rows = await Location.getById(insertedId);  
    assert.strictEqual(rows[0].longitude, 46.0); 
    assert.strictEqual(rows[0].latitude, 16.0);  
  });

  it('should delete location by full fields', async function () {
    const locationToDelete = new Location(
      null,
      47.0,
      17.0  
    );
    const [insertResult] = await locationToDelete.insert();
    locationToDelete.id = insertResult.insertId; 

    const [delResult] = await locationToDelete.delete(); 
    assert.strictEqual(delResult.affectedRows, 1);  
  });

  it('should delete location by id', async function () {
    const [result] = await Location.deleteById(insertedId);
    assert.strictEqual(result.affectedRows, 1);
  });
});
