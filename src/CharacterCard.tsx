import imageMap from './image-map.json';
import { CharacterName, CategoryIcon } from './types';

interface CharacterCardProps {
    name: CharacterName;
    locked: boolean;
    category: CategoryIcon;
    active: boolean;
}

function CharacterCard({ name, locked, category, active }: CharacterCardProps) {
    const cardStates = imageMap.CharacterCards.CardStates;
    const cardClasses = `character-card${locked ? ' locked' : ''}${active ? ' active' : ''}`;

    return (
        <div className={cardClasses}>
            <div className="background-image-container">
                <img 
                    className="background-image"
                    src={cardStates['CharacterCard_Background_Normal']}
                    alt={name}
                />
                <img 
                    className="background-image active-overlay"
                    src={cardStates['CharacterCard_Background_Active']}
                    alt={name}
                />
            </div>
            <div className="portrait-container">
                <img 
                    className="portrait-image"
                    src={imageMap.CharacterCards.CharacterPortraits[name]}
                    alt={name}
                />
            </div>
            <div className="foreground-image-container">
                <img 
                    className="foreground-image"
                    src={locked ? cardStates['CharacterCard_Foreground_Locked'] : cardStates['CharacterCard_Foreground_Normal']}
                    alt={name}
                />
                <img 
                    className="foreground-image active-overlay"
                    src={locked ? cardStates['CharacterCard_Locked_Active'] : cardStates['CharacterCard_Active']}
                    alt={name}
                />
            </div>
            <img 
                className="category-image"
                src={imageMap.Icons[category]}
                alt={category}
            />
            <div className="character-name">{name.toUpperCase()}</div>
        </div>
    );
}
export default CharacterCard