import { Injectable } from '@nestjs/common';
import { ApplicationDto, ApplicationFullDto } from '../application/dto';
import { Decision } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DecisionService {

    constructor(private prisma: PrismaService) {
    }

    async postDecision(application: ApplicationDto): Promise<Decision> {
        const dbClient = await this.prisma.client.findUnique({
                where: {
                    id: Number(application.clientId)
                },
                include: {
                    application: true,
                    creditScore: true,
                    decision: true
                }
            })

        const dbApplication = await this.prisma.application.create({
            data: {
                clientId: dbClient.id,
                loanAmount: Number(application.loanAmount),
                purpose: application.purpose,
                applicationDate: new Date(application.applicationDate),
                expirationDate: new Date(application.expirationDate),
            }
        })

        // TODO: Поиск информации по сервисам (НБКИ и др.)
        const dbCreditScore = await this.prisma.creditScore.create({
            data: {
                clientId: dbClient.id,
                applicationCount: 0,
                applicationOpenCount: 0
            }
        })

        const decision = {
            status: 'APPROVED',
        }

        const dbDecision = await this.prisma.decision.create({
            data: {
                clientId: dbClient.id,
                applicationId: dbApplication.id,
                creditScoreId: dbCreditScore.id,
                status: decision.status
            },
            include: {
                client: true,
                application: true,
                creditScore: true
            }
        })

        return dbDecision;
    }

    postDecisionFull(applicationFull: ApplicationFullDto) {

    }
}
