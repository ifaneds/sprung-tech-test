import imageMap from './image-map.json';
import { CharacterName, CategoryIcon } from './types';
import { getImagePath } from './utils';

interface CharacterCardProps {
    name: CharacterName;
    locked: boolean;
    category: CategoryIcon;
    active: boolean;
}

function CharacterCard({ name, locked, category, active }: CharacterCardProps) {
    const cardStates = imageMap.CharacterCards.CardStates;
    
    // Build up the CSS classes based on the card's state
    const cardClasses = `character-card${locked ? ' locked' : ''}${active ? ' active' : ''}`;

    return (
        <div className={cardClasses}>
            {/* Background layer - shows normal or active state with a fade transition */}
            <div className="background-image-container">
                <img 
                    className="background-image"
                    src={getImagePath(cardStates['CharacterCard_Background_Normal'])}
                    alt={name}
                />
                <img 
                    className="background-image active-overlay"
                    src={getImagePath(cardStates['CharacterCard_Background_Active'])}
                    alt={name}
                />
            </div>
            
            {/* Portrait image with a fade-to-transparent gradient at the bottom */}
            <div className="portrait-container">
                <img 
                    className="portrait-image"
                    src={getImagePath(imageMap.CharacterCards.CharacterPortraits[name])}
                    alt={name}
                />
            </div>
            
            {/* Foreground layer - the card frame that shows locked/normal or active states */}
            <div className="foreground-image-container">
                <img 
                    className="foreground-image"
                    src={getImagePath(locked ? cardStates['CharacterCard_Foreground_Locked'] : cardStates['CharacterCard_Foreground_Normal'])}
                    alt={name}
                />
                <img 
                    className="foreground-image active-overlay"
                    src={getImagePath(locked ? cardStates['CharacterCard_Locked_Active'] : cardStates['CharacterCard_Active'])}
                    alt={name}
                />
            </div>
            
            {/* Category icon (Assassin, Brawler, etc.) displayed in a circle */}
            <img 
                className="category-image"
                src={getImagePath(imageMap.Icons[category])}
                alt={category}
            />
            
            {/* Character name at the bottom of the card */}
            <div className="character-name">{name.toUpperCase()}</div>
        </div>
    );
}
export default CharacterCard