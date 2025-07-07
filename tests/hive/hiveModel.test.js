import assert from 'assert';
import Hive from '../../model/hiveModel.js';
import connection from '../../util/database.js';

describe('Hive model tests', function () {
  let insertedId;

  const testHive = new Hive(
    null,
    'TestHive',
    'TestLocation',
    'lr',
    'online',
    1,
    1,
    2
  );

  after(async () => {
    // Cleanup if any leftover
    if (insertedId) {
      await Hive.deleteById(insertedId);
    }
  });

  it('should insert a new hive', async function () {
    const [result] = await testHive.insert();
    insertedId = result.insertId;
    //console.log('Inserted ID:', result.insertId);
    assert.ok(insertedId > 0);
  });

  it('should get hive by id', async function () {
    const rows = await Hive.getById(insertedId);
    assert.strictEqual(rows.length, 1);
    assert.strictEqual(rows[0].name, 'TestHive');
  });

  it('should get all hives', async function () {
    const allHives = await Hive.getAll();
    assert.ok(Array.isArray(allHives));
    assert.ok(allHives.length >= 1);
  });

  it('should update hive', async function () {
    testHive.id = insertedId;
    testHive.name = 'UpdatedHive';
    
    // Check if insertedId is set before updating
    assert.ok(insertedId, 'Insert ID should be set before updating');
    
    await testHive.update();
  
    const rows = await Hive.getById(insertedId);
    assert.strictEqual(rows[0].name, 'UpdatedHive');
  });

  it('should delete hive by full fields', async function () {
    const hiveToDelete = new Hive(
      null,
      'ToDeleteHive',
      'SomeLoc',
      'lr',
      'online',
      1,
      1,
      2
    );
    const [insertResult] = await hiveToDelete.insert();
    hiveToDelete.id = insertResult.insertId;

    const [delResult] = await hiveToDelete.delete();
    assert.strictEqual(delResult.affectedRows, 1);
  });

  it('should delete hive by id', async function () {
    const [result] = await Hive.deleteById(insertedId);
    assert.strictEqual(result.affectedRows, 1);
  });
});
