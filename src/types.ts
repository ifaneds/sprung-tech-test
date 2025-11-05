// All the character names - used to make sure we're using valid character names throughout the app
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

// Category icons match the image file names in the Icons folder
export enum CategoryIcon {
    Icon_All = 'Icon_All',
    Icon_Assassin = 'Icon_Assassin',
    Icon_Brawler = 'Icon_Brawler',
    Icon_Support = 'Icon_Support',
    Icon_Tank = 'Icon_Tank'
}

// Convert the icon enum (like "Icon_Assassin") to display text (like "Assassin")
// Just removes the "Icon_" prefix
export function getCategoryText(category: CategoryIcon): string {
    return category.replace('Icon_', '');
}

// Character data structure - simple strings for category names, not enum values
export interface CharacterData {
    name: string;
    category: string;
    locked: boolean;
}

// Convert a simple category name (like "Assassin") to the matching CategoryIcon enum
// This lets us use simple strings in the character data but still get type safety
export function getCategoryIcon(category: string): CategoryIcon {
    const iconMap: Record<string, CategoryIcon> = {
        Assassin: CategoryIcon.Icon_Assassin,
        Brawler: CategoryIcon.Icon_Brawler,
        Support: CategoryIcon.Icon_Support,
        Tank: CategoryIcon.Icon_Tank,
        All: CategoryIcon.Icon_All,
    };
    // Default to "All" if we get an unknown category (shouldn't happen, but safety first)
    return iconMap[category] ?? CategoryIcon.Icon_All;
}

// The actual character data - all the characters in the game with their properties
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

