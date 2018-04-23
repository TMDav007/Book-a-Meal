import express from 'express';

import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

const port = 3030;
app.set('port', port);

app.listen(port, () => {
  console.log('we are running live');
});

export default app;