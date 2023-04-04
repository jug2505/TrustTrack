import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApplicationDto, ApplicationFullDto } from '../application/dto';
import { PrismaService } from '../prisma/prisma.service';
import { FnsResponse } from './models/fns-response.model';
import { Decision } from '@prisma/client';

@Injectable()
export class DecisionService {

    constructor(private prisma: PrismaService,
                private httpService: HttpService,
                private confService: ConfigService) {
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

        const decision = {
            status: 'APPROVED',
        }

        // TODO: Поиск информации по сервисам (ФНС, НБКИ и др.)
        const fnsResponse = await this.getFns(+dbClient.inn);

        if (fnsResponse['Банкрот']['Статус']) {
            decision.status = 'DECLINE';
        }

        const dbCreditScore = await this.prisma.creditScore.create({
            data: {
                clientId: dbClient.id,
                applicationCount: 0,
                applicationOpenCount: 0
            }
        })


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

    async getFns(inn: number): Promise<FnsResponse> {
        // return this.httpService.axiosRef.post(`https://api-fns.ru/api/fl_status?inn=${inn}&key=${this.confService.get('FNS_API_KEY')}`)

        return new Promise<FnsResponse>((resolve) => {
            resolve({
                'Корректность': {
                    'КонтрСумма': true,
                    'Недействительный': false,
                    'НедейстДата': 'string',
                },

                'Самозанятость': {
                    'Статус': true,
                    'Текст': 'string',
                },

                'ИП': {
                    'Статус': false,
                    'Ссылка': 'string',
                    'Текст': 'string',
                },

                'Банкрот': {
                    'Статус': false,
                    'Ссылка': 'string',
                    'Текст': 'string',
                },

                'ПоддержкаМСП': {
                    'ФормПод': 'string',
                    'ВидПод': 'string',
                    'РазмПодСум': 'string',
                    'РазмПодСр': 'string',
                    'СрокПодМакс': 'string',
                    'НарушПоддержкаМСП': 'string'
                },

                'ФИО': 'Фамилия Имя Отчество'
            })

        })
    }
}
