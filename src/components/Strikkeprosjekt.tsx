import {LinkCard, Tag} from "@navikt/ds-react";

interface Props {
    tittel?: string;
    img?: string;
}

export default function Strikkeprosjekt({tittel, img}: Props) {
    return (
        <>
            <LinkCard>
                {img && <LinkCard.Image aspectRatio="16/6">
                    <img src={img} className="max-w-[200px]"/>
                </LinkCard.Image>}
                <LinkCard.Title>
                    <LinkCard.Anchor href="/eksempel">{tittel}</LinkCard.Anchor>
                </LinkCard.Title>
                <LinkCard.Description>
                    Erstatter inntekten din når du ikke kan jobbe på grunn av sykdom eller
                    skade.
                </LinkCard.Description>
                <LinkCard.Footer>
                    <Tag size="small" variant="strong">
                        Tag 1
                    </Tag>
                    <Tag size="small">Tag 2</Tag>
                </LinkCard.Footer>
            </LinkCard>
        </>
    )
}