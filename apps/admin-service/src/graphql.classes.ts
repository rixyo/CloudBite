
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class SecretkeyApplicationInput {
    email: string;
    restaurant_license: string;
    mobile_number: string;
    passport_nid: string;
}

export class UpdateWithdrowalApplicationInput {
    status: string;
}

export class UpdateSecretkeyApplicationInput {
    status: string;
}

export class WithdrowalApplicationInput {
    email: string;
    amount: string;
    branch_name: string;
    passport_nid: string;
    account_number: string;
}

export abstract class IQuery {
    abstract SecretkeyApplications(): SecretkeyApplication[] | Promise<SecretkeyApplication[]>;

    abstract SecretkeyApplication(id: string): SecretkeyApplication | Promise<SecretkeyApplication>;

    abstract WithdrowalApplications(): WithdrowalApplication[] | Promise<WithdrowalApplication[]>;

    abstract WithdrowalApplication(id: string): WithdrowalApplication | Promise<WithdrowalApplication>;

    abstract UserWithdrowalAmount(email: string): WithdrowAmountResponse | Promise<WithdrowAmountResponse>;
}

export abstract class IMutation {
    abstract secretkeyApplication(input: SecretkeyApplicationInput): SecretkeyApplication | Promise<SecretkeyApplication>;

    abstract updateSecretkeyApplication(id: string, input: UpdateSecretkeyApplicationInput): SecretkeyApplication | Promise<SecretkeyApplication>;

    abstract deleteSecretkeyApplication(id: string): SecretkeyApplication | Promise<SecretkeyApplication>;

    abstract withdrowApplication(input: WithdrowalApplicationInput): WithdrowalApplication | Promise<WithdrowalApplication>;

    abstract updateWithdrowalApplication(id: string, input: UpdateWithdrowalApplicationInput): WithdrowalApplication | Promise<WithdrowalApplication>;

    abstract deleteWithdrowalApplication(id: string): WithdrowalApplication | Promise<WithdrowalApplication>;

    abstract sentEmail(email: string, message: string): EmailResponse | Promise<EmailResponse>;
}

export class SecretkeyApplication {
    id: string;
    email: string;
    restaurant_license: string;
    mobile_number: string;
    passport_nid: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}

export class EmailResponse {
    message: string;
}

export class WithdrowalApplication {
    id: string;
    email: string;
    amount: string;
    branch_name: string;
    passport_nid: string;
    account_number: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}

export class WithdrowAmountResponse {
    total: string;
}

type Nullable<T> = T | null;
