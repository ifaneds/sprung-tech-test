import { useState, useEffect, useMemo } from "react"
import CharacterCard from "./CharacterCard"
import imageMap from "./image-map.json"
import { CharacterName, CharacterData, characters, categories } from "./types"
import CategoryBar from "./CategoryBar";
import { getImagePath } from "./utils";

const sortedCharacters = [...characters].sort((a, b) => a.name.localeCompare(b.name));

function App() {
  const [activeCharacter, setActiveCharacter] = useState<CharacterData | null>(sortedCharacters[0] || null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [showLocked, setShowLocked] = useState(true);
  const [isDetailView, setIsDetailView] = useState(false);

  const filteredCharacters = useMemo(() => {
    return sortedCharacters.filter(character => {
      if (!showLocked && character.locked) {
        return false;
      }
      if (selectedCategory === 'All') {
        return true;
      }
      return character.category === selectedCategory;
    });
  }, [selectedCategory, showLocked]);

  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => setIsFiltering(false), 12);
    if (filteredCharacters.length > 0) {
      setActiveCharacter(filteredCharacters[0]);
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
        
        {!isDetailView ? (
          <>
            <div className="category-filter-bar">
              {categories.map((category) => (
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
                src={getImagePath(showLocked ? imageMap.Buttons.Checkbox_Fill : imageMap.Buttons.Checkbox_Empty)}
                alt="Show Locked Toggle"
                onClick={() => setShowLocked(!showLocked)}
              />
              <img src={getImagePath(imageMap.Buttons.Checkbox_Underline)} alt="Show Locked Toggle" />
              <div className="show-locked-toggle-text">Show locked</div>
            </div>
            <div className={`character-grid ${isFiltering ? 'character-grid-filtering' : ''}`}>
              {filteredCharacters.map((character) => (
                <div
                  key={character.name}
                  className="character-card-wrapper"
                  onClick={() => setActiveCharacter(character)}
                >
                  <CharacterCard
                    name={character.name as CharacterName}
                    locked={character.locked}
                    category={character.category}
                    progress={character.progress}
                    active={activeCharacter?.name === character.name}
                  />
                </div>
              ))}
            </div>
            <div className={`continue-button${activeCharacter?.locked ? ' disabled' : ''}`}>
              <div className="continue-button-text" onClick={() => {
                if (!activeCharacter?.locked) {
                  setIsDetailView(true);
                }
              }}>CONTINUE</div>
              <img src={getImagePath(imageMap.Buttons.Checkbox_Underline)} alt="Continue Button" />
            </div>
          </>
        ) : (
          <>
            <div className="back-button">
              <div className="back-button-text" onClick={() => {
                setIsDetailView(false);
              }}>BACK</div>
              <img src={getImagePath(imageMap.Buttons.Checkbox_Underline)} alt="Back Button" />
            </div>
            <div className="enlarged-character-card">
              <CharacterCard
                name={activeCharacter?.name as CharacterName}
                locked={activeCharacter?.locked || false}
                category={activeCharacter?.category || ''}
                progress={activeCharacter?.progress || 0}
                active={true}
              />
            </div>
            <div className="character-details-container">
              <div className="character-details-name">{activeCharacter?.name.toUpperCase()}</div>
              <div className="character-details-category">{activeCharacter?.category}</div>
              <div className="character-details-progress">Progress to next level: {activeCharacter?.progress}/15</div>
              <div className="character-details-bio">A brief bio of the character here</div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App

