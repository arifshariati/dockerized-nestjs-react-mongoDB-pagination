import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PaginateService } from './paginate.service';

@Module({
  imports: [
    forwardRef(()=> UserModule),
  ],
  providers: [PaginateService],
  exports:[PaginateService]
})
export class PaginateModule {}
