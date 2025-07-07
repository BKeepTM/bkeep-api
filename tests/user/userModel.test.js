import assert from 'assert';
import User from '../../model/userModel.js';
import connection from '../../util/database.js';

describe('User model tests', function () {
  let insertedId;

  const testUser = new User(
    null,
    'TestUser',
    'password123',
    'testuser@example.com',
    'default'
  );

  after(async () => {
    // Cleanup if any leftover
    if (insertedId) {
      await User.deleteById(insertedId);
    }
    connection.end(); // Close connection after all tests
  });

  it('should insert a new user', async function () {
    const [result] = await testUser.insert();
    insertedId = result.insertId;
    assert.ok(insertedId > 0, 'Inserted ID should be greater than 0');
  });

  it('should get user by id', async function () {
    const rows = await User.getById(insertedId);
    assert.strictEqual(rows.length, 1, 'Only one user should be returned');
    assert.strictEqual(rows[0].username, 'TestUser', 'Username should match');
  });

  it('should get all users', async function () {
    const allUsers = await User.getAll();
    assert.ok(Array.isArray(allUsers), 'All users should be returned as an array');
    assert.ok(allUsers.length >= 1, 'There should be at least one user in the list');
  });

  it('should update user', async function () {
    testUser.id = insertedId;
    testUser.username = 'UpdatedUser';
    testUser.password = 'newpassword123';

    await testUser.update();

    const rows = await User.getById(insertedId);
    assert.strictEqual(rows[0].username, 'UpdatedUser', 'Username should be updated');
    assert.strictEqual(rows[0].password, 'newpassword123', 'Password should be updated');
  });

  it('should delete user by id', async function () {
    const [result] = await User.deleteById(insertedId);
    assert.strictEqual(result.affectedRows, 1, 'One row should be deleted');
  });

  it('should delete user by full fields', async function () {
    const userToDelete = new User(
      null,
      'ToDeleteUser',
      'password123',
      'todeleteuser@example.com',
      'default'
    );
    const [insertResult] = await userToDelete.insert();
    userToDelete.id = insertResult.insertId;

    const [delResult] = await userToDelete.delete(); 
    assert.strictEqual(delResult.affectedRows, 1, 'User should be deleted');
  });
});
