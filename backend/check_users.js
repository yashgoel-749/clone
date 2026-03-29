const { query } = require('./db');

query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users'")
  .then(r => {
    console.log(JSON.stringify(r.rows, null, 2));
    process.exit();
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
