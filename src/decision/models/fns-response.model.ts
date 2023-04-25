// https://api-fns.ru/api_help

export interface FnsResponse {
    "Корректность": {
        "КонтрСумма": boolean;
        "Недействительный": boolean;
        "НедейстДата": string;
        "12знаков"?: string;
        "Текст"?: string;
    }

    "Самозанятость": {
        "Статус": boolean;
        "Текст": string;
    }

    "ИП": {
        "Статус": boolean;
        "Ссылка": string;
        "Текст"?: string;
    }

    "Банкрот"?: {
        "Статус": boolean;
        "Ссылка": string;
        "Текст"?: string;
    }

    "ПоддержкаМСП"?: {
        "ФормПод": string;
        "ВидПод": string;
        "РазмПодСум": string;
        "РазмПодСр": string;
        "СрокПодМакс": string;
        "НарушПоддержкаМСП": string;
    }

    "ФИО"?: string;
}
