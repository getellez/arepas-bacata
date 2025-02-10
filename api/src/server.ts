import http from 'node:http'
import MyApp from './app';
import express from 'express'

class ServerInitializer {
  private readonly app: express.Application;
  private readonly server: http.Server;
  public port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  constructor(){
    this.app = new MyApp().app;
    this.server = http.createServer(this.app);
  }

  listen(port: number = this.port){
    this.server.listen(port, ()=> {
      console.log(`Server running on port ${this.port}`);
    }).on('error', (err: any) => {
      console.error(`Error starting server: ${err.message}`);
    });
  }
}

const server = new ServerInitializer();
server.listen();