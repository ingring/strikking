import {ActionMenu, BodyShort, Button} from "@navikt/ds-react";
/*import {MenuElipsisVerticalIcon, PlusMinusSlashIcon} from "@navikt/aksel-icons";*/
import {AddCounterForm} from "./AddCounterForm.tsx";
import { useState } from "react";

export function TrePrikker( { strikkeprosjektId }: { strikkeprosjektId: number }) {
    const [open, setOpen] = useState(false);

    return (
        <>
        <ActionMenu>
            <ActionMenu.Trigger>
                <Button
                    data-color="neutral"
                    variant="tertiary"
                   /* icon={<MenuElipsisVerticalIcon title="Saksmeny" />}*/
                    size="small"
                />
            </ActionMenu.Trigger>
            <ActionMenu.Content>
                <ActionMenu.Group label={"Handlinger"}>
                    <ActionMenu.Item onSelect={() => setOpen(true)}>
                        {/*<PlusMinusSlashIcon title="a11y-title" fontSize="1.5rem" className="inline mr-2" />*/}
                        <BodyShort size="small" className="inline">Legg til ny teller</BodyShort>
                    </ActionMenu.Item>
                </ActionMenu.Group>
            </ActionMenu.Content>
        </ActionMenu>
    <AddCounterForm strikkeprosjektId={strikkeprosjektId} open={open} onClose={() => setOpen(false)}/>
        </>
    )
}