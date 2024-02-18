import { User } from "./user.model";

export class Discussion {
    constructor(public sender: User, public messages: string[]){}
}