import {Tag} from "@navikt/ds-react";
import {ProsjektStatus} from "../types.ts";

function erStatusNokkel(status: string): status is keyof typeof ProsjektStatus {
    return Object.prototype.hasOwnProperty.call(ProsjektStatus, status);
}

export function Status({ status }: { status: string }) {
    const label = erStatusNokkel(status) ? ProsjektStatus[status] : status;

    return (
    <Tag size="small" variant="outline">
        {label}
    </Tag>
    )
}