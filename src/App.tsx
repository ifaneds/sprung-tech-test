import { useState, useEffect, useMemo } from "react"
import CharacterCard from "./CharacterCard"
import imageMap from "./image-map.json"
import { CharacterName, getCategoryIcon, characters, CategoryIcon } from "./types"
import CategoryBar from "./CategoryBar";

const sortedCharacters = [...characters].sort((a, b) => a.name.localeCompare(b.name));

function App() {
  const [activeCharacter, setActiveCharacter] = useState<string>(sortedCharacters[0].name);
  const [selectedCategory, setSelectedCategory] = useState<CategoryIcon>(CategoryIcon.Icon_All);
  const [hoveredCategory, setHoveredCategory] = useState<CategoryIcon | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [showLocked, setShowLocked] = useState(true);

  // Filter characters based on selected category and locked status
  const filteredCharacters = useMemo(() => {
    return sortedCharacters.filter(character => {
      // Filter out locked characters if showLocked is false
      if (!showLocked && character.locked) {
        return false;
      }
      
      // Filter by category
      if (selectedCategory === CategoryIcon.Icon_All) {
        return true;
      }
      const characterCategoryIcon = getCategoryIcon(character.category);
      return characterCategoryIcon === selectedCategory;
    });
  }, [selectedCategory, showLocked]);

  // Handle filtering animation and auto-activate first card
  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => setIsFiltering(false), 12);

    // Auto-activate first card when category or showLocked changes
    if (filteredCharacters.length > 0) {
      setActiveCharacter(filteredCharacters[0].name);
    }
    
    return () => clearTimeout(timer);
  }, [filteredCharacters]);

  return (
    <div className="character-selection-screen">
      <div className="background-image">
        <img src={imageMap.Static.Background} alt="Background" />
      </div>
      <div className="screen-divider">
        <img src={imageMap.Static.ScreenDivider} alt="Screen Divider" />
      </div>
      <div className="bottom-bar">
        <img src={imageMap.Static.Bottom_Bar} alt="Bottom Bar" />
      </div>
      <div className="content-container">
        <div className="title">
          <div className="title-text">CHARACTERS</div>
        </div>
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
        <div className="show-locked-toggle">
          <img
            className="checkbox-toggle"
            src={showLocked ? imageMap.Buttons.Checkbox_Fill : imageMap.Buttons.Checkbox_Empty}
            alt="Show Locked Toggle"
            onClick={() => setShowLocked(!showLocked)}
          />
          <img src={imageMap.Buttons.Checkbox_Underline} alt="Show Locked Toggle" />
          <div className="show-locked-toggle-text">Show locked</div>
        </div>
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

