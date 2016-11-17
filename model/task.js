const pg = require('pg-promise')({ });

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};

const db = pg(config);

module.exports = {
  getTasks(req, res, next) {
    db.any('SELECT * from task;')
    .then((tasks)=> {
      res.rows = tasks;
      next();
    })
    .catch(error => next(error));
  },

  addTask(req, res, next) {
    console.log('===addTask===', req.body);
    db.one(
      'INSERT ONTO task (name, description) VALUES ($/name/, $/desc/) returning *;',
      req.body
      )
    .then((task)=> {
      console.log('ADDED TASK SUCCESSFUL');
      res.rows = task;
      next();
    })
    .catch(error => next(error));
  },
}
