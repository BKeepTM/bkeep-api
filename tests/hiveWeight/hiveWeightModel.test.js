import assert from 'assert';
import HiveWeight from '../../model/hiveWeightModel.js';
import connection from '../../util/database.js';

describe('HiveWeight model tests', function () {
  let insertedId;

  const testHiveWeight = new HiveWeight(
    null,
    100,
    new Date('2025-05-01T12:00:00Z'),
    5 // id_hive
  );

  after(async () => {
    // Cleanup if any leftover
    if (insertedId) {
      await HiveWeight.deleteById(insertedId);
    }
  });

  it('should insert a new hive weight', async function () {
    const [result] = await testHiveWeight.insert();
    insertedId = result.insertId;
    assert.ok(insertedId > 0);
  });

  it('should get hive weight by id', async function () {
    const rows = await HiveWeight.getById(insertedId);
    assert.strictEqual(rows.length, 1);
    assert.strictEqual(rows[0].weight, 100);
  });

  it('should get all hive weights', async function () {
    const allHiveWeights = await HiveWeight.getAll();
    assert.ok(Array.isArray(allHiveWeights));
    assert.ok(allHiveWeights.length >= 1);
  });

  it('should update hive weight', async function () {
    testHiveWeight.id_hive_weight = insertedId;
    testHiveWeight.weight = 150;

    assert.ok(insertedId, 'Insert ID should be set before updating');

    await testHiveWeight.update();

    const rows = await HiveWeight.getById(insertedId);
    assert.strictEqual(rows[0].weight, 150);
  });

  it('should delete hive weight by full fields', async function () {
    const hiveWeightToDelete = new HiveWeight(
      null,
      200,
      new Date('2025-06-01T12:00:00Z'),
      6
    );
    const [insertResult] = await hiveWeightToDelete.insert();
    hiveWeightToDelete.id_hive_weight = insertResult.insertId;

    const [delResult] = await hiveWeightToDelete.delete();
    assert.strictEqual(delResult.affectedRows, 1);
  });

  it('should delete hive weight by id', async function () {
    const [result] = await HiveWeight.deleteById(insertedId);
    assert.strictEqual(result.affectedRows, 1);
  });
});
