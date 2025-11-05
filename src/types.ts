export enum CharacterName {
    Adrian = 'Adrian',
    Alfred = 'Alfred',
    Amelia = 'Amelia',
    Annalise = 'Annalise',
    Djura = 'Djura',
    Edwin = 'Edwin',
    Eileen = 'Eileen',
    Hunter = 'Hunter',
    Maria = 'Maria',
    OldHunter = 'OldHunter',
    Pierce = 'Pierce',
    Yahar = 'Yahar'
}

export enum CategoryIcon {
    Icon_All = 'Icon_All',
    Icon_Assassin = 'Icon_Assassin',
    Icon_Brawler = 'Icon_Brawler',
    Icon_Support = 'Icon_Support',
    Icon_Tank = 'Icon_Tank'
}

export function getCategoryText(category: CategoryIcon): string {
    return category.replace('Icon_', '');
}

export interface CharacterData {
    name: string;
    category: string;
    locked: boolean;
}

export function getCategoryIcon(category: string): CategoryIcon {
    const iconMap: Record<string, CategoryIcon> = {
        Assassin: CategoryIcon.Icon_Assassin,
        Brawler: CategoryIcon.Icon_Brawler,
        Support: CategoryIcon.Icon_Support,
        Tank: CategoryIcon.Icon_Tank,
        All: CategoryIcon.Icon_All,
    };
    return iconMap[category] ?? CategoryIcon.Icon_All;
}

export const characters: CharacterData[] = [
    { name: 'Adrian', category: 'Support', locked: false },
    { name: 'Alfred', category: 'Tank', locked: false },
    { name: 'Amelia', category: 'Brawler', locked: false },
    { name: 'Annalise', category: 'Brawler', locked: false },
    { name: 'Djura', category: 'Tank', locked: true },
    { name: 'Edwin', category: 'Support', locked: false },
    { name: 'Eileen', category: 'Assassin', locked: false },
    { name: 'Hunter', category: 'Assassin', locked: false },
    { name: 'Maria', category: 'Support', locked: true },
    { name: 'OldHunter', category: 'Brawler', locked: true },
    { name: 'Pierce', category: 'Assassin', locked: true },
    { name: 'Yahar', category: 'Tank', locked: false },
];

