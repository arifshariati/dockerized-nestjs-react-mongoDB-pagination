import { Request } from "express";

const generateQuery = (req: Request) => {

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
export default generateQuery;