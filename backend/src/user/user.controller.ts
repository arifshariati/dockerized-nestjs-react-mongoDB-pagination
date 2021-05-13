import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import {Request} from "express";
import { generateQuery } from 'src/utils';

const current_page = 1;
const per_page = 10;
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    // Get All Users
    // **************************************************** //
    @Get('all')
    async getAllUsers(@Req() req: Request) {


        let options = generateQuery(req);
        
        const query = this.userService.find(options);

        const page: number = parseInt(req.query.page as any) || current_page;
        const limit: number = parseInt(req.query.per_page as any) || per_page;
        const total = await this.userService.count(options);

        const data = await query.skip((page - 1) * limit).limit(limit).exec();

        return {
            data,
            total,
            page,
            last_page: Math.ceil(total / limit)
        };
    }
}
