/*********************************************************
  1) Achievements Data
**********************************************************
 This object contains all your achievements in one place.
 Each key is a unique identifier:
   - icon: path or URL to the achievement’s icon image
   - title: short name displayed in popups or the achievements page
   - description: explains how the achievement is earned
**********************************************************/
const achievementsData = {
  "first-visit": {
    icon: "https://via.placeholder.com/40/0000FF/FFFFFF?text=FV",
    title: "First Visit",
    description: "Thanks for stopping by our site for the first time!"
  },
  "made-a-purchase": {
    icon: "https://via.placeholder.com/40/008000/FFFFFF?text=Buy",
    title: "Made a Purchase",
    description: "You successfully purchased an item. Enjoy your goodies!"
  },
  "wrote-a-review": {
    icon: "https://via.placeholder.com/40/FF0000/FFFFFF?text=Rev",
    title: "Wrote a Review",
    description: "We appreciate your feedback!"
  }
};

/*********************************************************
  2) showAchievementPopup
**********************************************************
 Displays a small popup when an achievement is unlocked.
 Steps:
   1. Find the popup container in the DOM (index.html).
   2. Update the icon, title, and description based on the unlocked achievement.
   3. Set popup visibility to "block" to show it.
   4. Fade out or hide after a short duration (3 seconds here).
**********************************************************/
function showAchievementPopup(achievementKey) {
  // "achievement-popup" is defined in index.html
  const popup = document.getElementById('achievement-popup');
  
  // If there's no popup container (e.g., we're on achievements.html), do nothing
  if (!popup) return;

  const achievement = achievementsData[achievementKey];
  
  if (!achievement) {
    console.warn(`No achievement data found for key: ${achievementKey}`);
    return;
  }

  // Populate popup elements
  document.getElementById('achievement-icon').src = achievement.icon;
  document.getElementById('achievement-title').textContent = achievement.title;
  document.getElementById('achievement-description').textContent = achievement.description;

  // Reveal the popup
  popup.style.display = 'block';

  // Auto-hide after 3 seconds (3000 ms)
  setTimeout(() => {
    popup.style.display = 'none';
  }, 3000);
}

/*********************************************************
  3) unlockAchievement
**********************************************************
 Main function to unlock an achievement when triggered.
 Steps:
   1. Check if achievement is already unlocked (localStorage).
   2. If not, store "true" in localStorage to mark as unlocked.
   3. Call showAchievementPopup() to display the pop-up for the user.
   4. If already unlocked, optionally log or do nothing.
**********************************************************/
function unlockAchievement(key) {
  const alreadyUnlocked = localStorage.getItem(key);

  if (!alreadyUnlocked) {
    localStorage.setItem(key, 'true');
    showAchievementPopup(key);
    console.log(`Achievement "${key}" unlocked!`);
  } else {
    // Already unlocked
    console.log(`Achievement "${key}" is already unlocked.`);
  }
}

/*********************************************************
  4) (Optional) Auto-Unlock an Achievement on Page Load
**********************************************************
 If you want to automatically award "first-visit" or any other
 achievement the first time a user visits, uncomment the line below.
**********************************************************/
// window.addEventListener('load', () => unlockAchievement('first-visit') );

/*********************************************************
  5) Debugging Utility: Clear All Unlocked Achievements
**********************************************************
 This function removes all achievements' unlocked states from localStorage,
 effectively "resetting" achievement progress in this browser.
 Note: This is only for testing or debugging. 
**********************************************************/
function debugClearAchievements() {
  for (const key in achievementsData) {
    localStorage.removeItem(key);
  }
  console.log("All unlocked achievements cleared from localStorage.");
  alert("All unlocked achievements have been reset for debugging!");
}
