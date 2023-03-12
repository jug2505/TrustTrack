import { Body, Controller, Post } from '@nestjs/common';
import { ApplicationDto, ApplicationFullDto } from '../application/dto';
import { DecisionService } from './decision.service';

@Controller('decisions')
export class DecisionController {

    constructor(private decisionService: DecisionService) {
    }


    @Post('')
    postDecision(@Body() application: ApplicationDto) {
        return this.decisionService.postDecision(application);
    }

    @Post('/full')
    postDecisionFull(@Body() applicationFull: ApplicationFullDto) {
        return this.decisionService.postDecisionFull(applicationFull);
    }
}
