import imageMap from './image-map.json';
import { getCategoryIconName } from './types';
import { getImagePath } from './utils';

interface CategoryBarProps {
    category: string;
    hovered: boolean;
    active: boolean;
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

function CategoryBar({ category, hovered, active, onClick, onMouseEnter, onMouseLeave }: CategoryBarProps) {
    const buttonImage = active 
        ? imageMap.Buttons.FilterButton_Active 
        : hovered 
        ? imageMap.Buttons.FilterButton_Hovered 
        : imageMap.Buttons.FilterButton_Normal;
    const iconKey = getCategoryIconName(category) as keyof typeof imageMap.Icons;

    return (
        <div 
            className={`category-filter-button${active ? ' active' : ''}`}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <img 
                className="filter-button-background"
                src={getImagePath(buttonImage)}
                alt="Filter button"
            />
            <div 
                className="filter-button-icon"
                style={{ 
                    maskImage: `url(${getImagePath(imageMap.Icons[iconKey])})`,
                    WebkitMaskImage: `url(${getImagePath(imageMap.Icons[iconKey])})`
                }}
            />
            <div className="filter-button-text">{category.toUpperCase()}</div>
        </div>
    );
}
export default CategoryBar