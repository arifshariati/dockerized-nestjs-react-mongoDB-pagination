import { Controller, forwardRef, Get, Inject, Req } from '@nestjs/common';
import { UserService } from './user.service';
import {Request} from "express";
import { PaginateService } from 'src/paginate/paginate.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
        @Inject(forwardRef(() => PaginateService))
        private readonly paginageService: PaginateService,
        ){}

    // Get All Users
    // **************************************************** //
    @Get('all')
    async getAllUsers(@Req() req: Request) {

        return await this.paginageService.userPaginate(req);

    }
}
