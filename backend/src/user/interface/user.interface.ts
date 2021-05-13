import { Document } from "mongoose";

interface User extends Document {
    name: string;
    email: string;
};

export default User;