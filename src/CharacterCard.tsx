import imageMap from './image-map.json';
import { CharacterName, getCategoryIconName } from './types';
import { getImagePath } from './utils';

interface CharacterCardProps {
    name: CharacterName;
    locked: boolean;
    category: string;
    progress: number;
    active: boolean;
}

function CharacterCard({ name, locked, progress, category, active }: CharacterCardProps) {
    const iconKey = getCategoryIconName(category) as keyof typeof imageMap.Icons;
    const cardStates = imageMap.CharacterCards.CardStates;
    const cardClasses = `character-card${locked ? ' locked' : ''}${active ? ' active' : ''}`;

    return (
        <div className={cardClasses}>
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
            <div className="portrait-container">
                <img 
                    className="portrait-image"
                    src={getImagePath(imageMap.CharacterCards.CharacterPortraits[name])}
                    alt={name}
                />
            </div>
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
            <div 
                className="category-image"
                style={{ 
                    maskImage: `url(${getImagePath(imageMap.Icons[iconKey])})`,
                    WebkitMaskImage: `url(${getImagePath(imageMap.Icons[iconKey])})`
                }}
            />
            <div className="character-name">{name.toUpperCase()}</div>

            <div className="progress-to-upgrade">
                <div className="progress-number">{progress}/ 15</div>
            </div>
        </div>
    );
}
export default CharacterCard