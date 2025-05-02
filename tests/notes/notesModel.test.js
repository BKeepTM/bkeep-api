import assert from 'assert';
import Notes from '../../model/notesModel.js';
import connection from '../../util/database.js';

describe('Notes model tests', function () {
  let insertedId;

  const testNote = new Notes(
    null,
    'This is a test note content', 
    new Date() 
  );

  after(async () => {
    // Cleanup if any leftover
    if (insertedId) {
      await Notes.deleteById(insertedId);
    }
  });

  it('should insert a new note', async function () {
    const [result] = await testNote.insert();
    insertedId = result.insertId; 
    assert.ok(insertedId > 0);  
  });

  it('should get note by id', async function () {
    const rows = await Notes.getById(insertedId);
    assert.strictEqual(rows.length, 1); 
    assert.strictEqual(rows[0].content, 'This is a test note content'); 
    assert.ok(rows[0].time); 
  });

  it('should get all notes', async function () {
    const allNotes = await Notes.getAll();
    assert.ok(Array.isArray(allNotes)); 
    assert.ok(allNotes.length >= 1);  
  });

  it('should update note', async function () {
    testNote.id = insertedId;  
    testNote.content = 'Updated note content';  
    testNote.time = new Date(); 
    assert.ok(insertedId, 'Insert ID should be set before updating');
    await testNote.update(); 

    const rows = await Notes.getById(insertedId);
    assert.strictEqual(rows[0].content, 'Updated note content');
  });

  it('should delete note by full fields', async function () {
    const noteToDelete = new Notes(
      null,
      'Note to delete',
      new Date('2025-06-01T12:00:00Z'),
    );
    const [insertResult] = await noteToDelete.insert();
    noteToDelete.id = insertResult.insertId; 

    const [delResult] = await noteToDelete.delete(); 
    assert.strictEqual(delResult.affectedRows, 1); 
  });

  it('should delete note by id', async function () {
    const [result] = await Notes.deleteById(insertedId);
    assert.strictEqual(result.affectedRows, 1); 
  });
});
