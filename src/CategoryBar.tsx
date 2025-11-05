import imageMap from './image-map.json';
import { CategoryIcon, getCategoryText } from './types';
import { getImagePath } from './utils';

interface CategoryBarProps {
    category: CategoryIcon;
    hovered: boolean;
    active: boolean;
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

function CategoryBar({ category, hovered, active, onClick, onMouseEnter, onMouseLeave }: CategoryBarProps) {
    // Pick the right button background image based on the current state
    // Active state takes priority, then hovered, otherwise use normal
    const buttonImage = active 
        ? imageMap.Buttons.FilterButton_Active 
        : hovered 
        ? imageMap.Buttons.FilterButton_Hovered 
        : imageMap.Buttons.FilterButton_Normal;

    return (
        <div 
            className={`category-filter-button${active ? ' active' : ''}`}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
        {/* Button background that changes based on state */}
        <img 
            className="filter-button-background"
            src={getImagePath(buttonImage)}
            alt="Filter button"
        />
        
        {/* Category icon (skull, shield, etc.) */}
        <img 
            className="filter-button-icon"
            src={getImagePath(imageMap.Icons[category])}
            alt={category}
        />
        
        {/* Category name text that appears on hover/active */}
        <div className="filter-button-text">{getCategoryText(category).toUpperCase()}</div>
        </div>
    );
}
export default CategoryBar