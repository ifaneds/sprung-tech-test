import imageMap from './image-map.json';
import { CategoryIcon, getCategoryText } from './types';

interface CategoryBarProps {
    category: CategoryIcon;
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

    return (
        <div 
            className={`category-filter-button${active ? ' active' : ''}`}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
        <img 
            className="filter-button-background"
            src={buttonImage}
            alt="Filter button"
        />
        <img 
            className="filter-button-icon"
            src={imageMap.Icons[category]}
            alt={category}
        />
        <div className="filter-button-text">{getCategoryText(category).toUpperCase()}</div>
        </div>
    );
}
export default CategoryBar