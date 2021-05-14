import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Request } from "express";
import { UserService } from 'src/user/user.service';

const current_page = 0;
const per_page = 10;

@Injectable()
export class PaginateService {

    constructor(
        @Inject(forwardRef(() =>UserService))
        private readonly userService: UserService,
    ){}
    
    userPaginate = async (req: Request) => {

        let options = this.generateUserQuery(req);

        const query = this.userService.find(options);

        const page: number = parseInt(req.query.page as any) || current_page;
        const limit: number = parseInt(req.query.perPage as any) || per_page;
        const total = await this.userService.count(options);

        const data = await query.skip((page) * limit).limit(limit).exec();

        return {
            data,
            total,
            page,
            last_page: Math.ceil(total / limit)
        };
    }

    private generateUserQuery = (req: Request) => {

        let options = {};
        let and = [];
        let or = [];
    
        if(req.query.search){
            or.push(
                {name: new RegExp(req.query.search.toString(), 'i')},
                {email: new RegExp(req.query.search.toString(), 'i')}
            );
        };
    
        if(req.query.gender){
            and.push({gender:req.query.gender});
        };
    
        if(or.length >0 && and.length > 0){
            options = {
                $or: or,
                $and: and
            };
        }else{
    
            if(or.length > 0){
                options = {
                    $or: or
                };
            }
            
            if(and.length > 0){
                options = {
                    $and: and
                };
            }
        }
        
        return options;
    };
}
