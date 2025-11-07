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

export const categories = ['All', 'Assassin', 'Brawler', 'Support', 'Tank'] as const;

export function getCategoryIconName(category: string): string {
    return `Icon_${category}`;
}

export interface CharacterData {
    name: string;
    category: string;
    locked: boolean;
    progress: number;
}

export const characters: CharacterData[] = [
    { name: 'Adrian', category: 'Support', locked: false, progress: 2 },
    { name: 'Alfred', category: 'Tank', locked: false, progress: 2 },
    { name: 'Amelia', category: 'Brawler', locked: false, progress: 8 },
    { name: 'Annalise', category: 'Brawler', locked: false, progress: 1 },
    { name: 'Djura', category: 'Tank', locked: true, progress: 6 },
    { name: 'Edwin', category: 'Support', locked: false, progress: 4 },
    { name: 'Eileen', category: 'Assassin', locked: false, progress: 6 },
    { name: 'Hunter', category: 'Assassin', locked: false, progress: 12 },
    { name: 'Maria', category: 'Support', locked: true, progress: 4 },
    { name: 'OldHunter', category: 'Brawler', locked: true, progress: 1 },
    { name: 'Pierce', category: 'Assassin', locked: true, progress: 3 },
    { name: 'Yahar', category: 'Tank', locked: false, progress: 5 },
];

