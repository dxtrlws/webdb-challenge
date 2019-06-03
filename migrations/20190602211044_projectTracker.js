exports.up = async function(knex) {
    await knex.schema.createTable('project', tbl => {
      tbl.increments();
      tbl.string('name', 128).notNullable();
      tbl.string('description');
      tbl.boolean('completed');
      tbl.timestamps(true, true);
    });
    await knex.schema.createTable('action', tbl => {
      tbl.increments();
      tbl
        .integer('project_id')
        .references('id')
        .inTable('project');
      tbl.string('description').notNullable();
      tbl.string('notes');
      tbl.boolean('completed');
      tbl.timestamps(true, true)
    });
  };
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('project');
    await knex.schema.dropTableIfExists('action');
  };
  