import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';

import firebase, {db} from './firebase'
import * as Sentry from '@sentry/node';


const app = express();
const invoicesRouter = express.Router();


Sentry.init({dsn: 'https://7023c824f708494d9ae7dba1ffc72fbf@sentry.io/4019863'});

app.use(cors());
app.use(Sentry.Handlers.requestHandler());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));


app.get('/', (req, res) => {
    res.status(200).send(`Hcmos API`)
});

app.use(Sentry.Handlers.errorHandler());

const listener = app.listen(process.env.PORT || 8080 || 8500, function () {
    console.log("Listening on port " + listener.address().port);
});

export default app;
