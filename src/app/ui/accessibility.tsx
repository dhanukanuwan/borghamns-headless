'use client'

import { useEffect } from 'react';
import { Accessibility, IAccessibilityOptions, IAccessibilityMenuLabelsOptions } from 'accessibility';

const SiteAccessibility = () => {

    const labels: IAccessibilityMenuLabelsOptions = {
        resetTitle: 'Återställa',
        closeTitle: 'Stänga',
        menuTitle: 'Tillgänglighetsalternativ',
        increaseText: 'Öka textstorleken',
        decreaseText: 'Minska textstorleken',
        increaseTextSpacing: 'Öka textavståndet',
        decreaseTextSpacing: 'Minska textavståndet',
        increaseLineHeight: 'Öka linjehöjden',
        decreaseLineHeight: 'Minska linjehöjden',
        invertColors: 'Invertera färger',
        grayHues: 'Grå nyanser',
        underlineLinks: 'Stryk under länkar',
        bigCursor: 'Stor markör',
        readingGuide: 'Läsguide',
        textToSpeech: 'Text till tal',
        speechToText: 'Tal till text',
        disableAnimations: 'Inaktivera animationer',
        hotkeyPrefix: 'Snabbtangent:'
    }

    const options: IAccessibilityOptions = {
        labels: labels
    }

    useEffect(() => {
        new Accessibility( options );
    }, [options]);

    return( <></>);
}

export default SiteAccessibility;