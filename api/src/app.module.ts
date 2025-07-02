import { Module } from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { HttpModule } from '@infra/http/http.module';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [
    HttpModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [ ],
})
export class AppModule {}
