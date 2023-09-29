import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepo } from "src/libs/db/AbstractRepo";
import { Users } from "./entity/UsersEntity";

export class UsersRepo extends AbstractRepo<Users> {}
