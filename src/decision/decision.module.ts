import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DecisionService } from './decision.service';
import { DecisionController } from './decision.controller';

@Module({
    imports: [HttpModule],
    providers: [DecisionService],
    controllers: [DecisionController]
})
export class DecisionModule {
}
