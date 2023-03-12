import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './client/clients.module';
import { DecisionModule } from './decision/decision.module';
import { ApplicationService } from './application/application.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        ClientsModule,
        DecisionModule,
        PrismaModule
    ],
    controllers: [AppController],
    providers: [AppService, ApplicationService],
})
export class AppModule {
}
