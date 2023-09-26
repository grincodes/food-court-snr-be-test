import { Global, Module, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Config } from "src/config/configuration";
import { UnitOfWork } from "./UnitOfWork";
import { UNIT_OF_WORK_PROVIDER } from "../constants";
import * as path from "path";
import { knex as Knex } from "knex";
import { Model, initialize } from "objection";

export let knexConnection = {};


class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly knex = Knex({
        client: 'pg',
        // connection: process.env.DATABASE_URL,
        connection: {
          host: Config.DATABASE_HOST,
          port: Config.DATABASE_PORT,
          database: Config.DATABASE_NAME,
          user: Config.DATABASE_USER,
          password: Config.DATABASE_PASSWORD,
        },
        migrations: {
          directory: 'src/migrations',
        },
        seeds: {
          directory: 'src/seeds',
        },
});


  async onModuleInit(): Promise<void> {
    
    //initialize models
    await initialize(this.knex,[])

    try {
         await this.knex.raw('SELECT 1');
    } catch (error) {

      throw new Error('Db Initialization Error')
    }
   

    knexConnection = this.knex
   
  }

  async onModuleDestroy(): Promise<void> {
    await this.knex.destroy();
  }
}

@Global()
@Module({
  providers: [
    DatabaseService,
    {
      provide: UNIT_OF_WORK_PROVIDER,
      useClass: UnitOfWork,
    },
  ],
  exports: [UNIT_OF_WORK_PROVIDER],
})
export class DatabaseModule {}
