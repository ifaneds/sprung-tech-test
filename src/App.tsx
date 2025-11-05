import { useState, useEffect, useMemo } from "react"
import CharacterCard from "./CharacterCard"
import imageMap from "./image-map.json"
import { CharacterName, getCategoryIcon, characters, CategoryIcon } from "./types"
import CategoryBar from "./CategoryBar";
import { getImagePath } from "./utils";

// Sort characters alphabetically so they're always displayed in a consistent order
const sortedCharacters = [...characters].sort((a, b) => a.name.localeCompare(b.name));

function App() {
  // The currently selected character card (the one that's highlighted)
  const [activeCharacter, setActiveCharacter] = useState<string>(sortedCharacters[0].name);
  
  // Which category filter is currently active (All, Assassin, Brawler, etc.)
  const [selectedCategory, setSelectedCategory] = useState<CategoryIcon>(CategoryIcon.Icon_All);
  
  // Track which filter button is being hovered for the hover effect
  const [hoveredCategory, setHoveredCategory] = useState<CategoryIcon | null>(null);
  
  // Brief flag to trigger the filtering animation when switching categories
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Toggle to show/hide locked characters
  const [showLocked, setShowLocked] = useState(true);

  // Filter the character list based on the selected category and locked toggle
  // Using useMemo so we only recalculate when the filters actually change
  const filteredCharacters = useMemo(() => {
    return sortedCharacters.filter(character => {
      // If the toggle is off, hide all locked characters
      if (!showLocked && character.locked) {
        return false;
      }
      
      // If "All" is selected, show everyone (already filtered by locked status above)
      if (selectedCategory === CategoryIcon.Icon_All) {
        return true;
      }
      
      // Otherwise, only show characters that match the selected category
      const characterCategoryIcon = getCategoryIcon(character.category);
      return characterCategoryIcon === selectedCategory;
    });
  }, [selectedCategory, showLocked]);

  // When the filter changes, briefly show the filtering animation
  // and automatically select the first character in the filtered list
  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => setIsFiltering(false), 12);

    // Auto-select the first character so there's always something highlighted
    if (filteredCharacters.length > 0) {
      setActiveCharacter(filteredCharacters[0].name);
    }
    
    return () => clearTimeout(timer);
  }, [filteredCharacters]);

  return (
    <div className="character-selection-screen">
      <div className="background-image">
        <img src={getImagePath(imageMap.Static.Background)} alt="Background" />
      </div>
      <div className="screen-divider">
        <img src={getImagePath(imageMap.Static.ScreenDivider)} alt="Screen Divider" />
      </div>
      <div className="bottom-bar">
        <img src={getImagePath(imageMap.Static.Bottom_Bar)} alt="Bottom Bar" />
      </div>
      <div className="content-container">
        <div className="title">
          <div className="title-text">CHARACTERS</div>
        </div>
        {/* Filter buttons on the left side - one for each category */}
        <div className="category-filter-bar">
          {Object.values(CategoryIcon).map((category) => (
            <CategoryBar
              key={category}
              category={category}
              hovered={hoveredCategory === category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
              onMouseEnter={() => setHoveredCategory(category)}
              onMouseLeave={() => setHoveredCategory(null)}
            />
          ))}
        </div>
        {/* Toggle to show/hide locked characters */}
        <div className="show-locked-toggle">
          <img
            className="checkbox-toggle"
            src={getImagePath(showLocked ? imageMap.Buttons.Checkbox_Fill : imageMap.Buttons.Checkbox_Empty)}
            alt="Show Locked Toggle"
            onClick={() => setShowLocked(!showLocked)}
          />
          <img src={getImagePath(imageMap.Buttons.Checkbox_Underline)} alt="Show Locked Toggle" />
          <div className="show-locked-toggle-text">Show locked</div>
        </div>
        
        {/* Grid of character cards - 5 columns, scrollable */}
        <div className={`character-grid ${isFiltering ? 'character-grid-filtering' : ''}`}>
          {filteredCharacters.map((character) => (
            <div
              key={character.name}
              className="character-card-wrapper"
              onClick={() => setActiveCharacter(character.name)}
            >
              <CharacterCard
                name={character.name as CharacterName}
                locked={character.locked}
                category={getCategoryIcon(character.category)}
                active={activeCharacter === character.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App

