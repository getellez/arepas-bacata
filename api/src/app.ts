import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet'


class MyApp {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use('/hello', (req, res) => {
      res.send('Hello, world!');
    });
  }
}

export default MyApp;