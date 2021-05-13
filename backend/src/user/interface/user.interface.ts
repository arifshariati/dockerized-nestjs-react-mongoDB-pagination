import { Document } from "mongoose";

interface User extends Document {
    
    name: string;
    gender: string;
    email: string;
    phone: string;
    country: string;
    city: string;
};

export default User;