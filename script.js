/*********************************************************
  Basic Achievements Data Structure
**********************************************************
 This object holds each achievement’s details:
 - Unique key: used to identify the achievement in localStorage.
 - icon: the path or URL to the achievement’s icon image.
 - title: short name for the achievement.
 - description: short note about what the user did to earn it.
 
 You can add more achievements as needed. For example, add a
 "shared-on-social" or "reached-level-10" achievement.
**********************************************************/
const achievementsData = {
  "first-visit": {
    icon: "https://via.placeholder.com/40/0000FF/FFFFFF?text=FV", // Example placeholder image
    title: "First Visit",
    description: "Thanks for stopping by our site for the first time!"
  },
  "made-a-purchase": {
    icon: "https://via.placeholder.com/40/008000/FFFFFF?text=Buy",
    title: "Made a Purchase",
    description: "You successfully purchased an item. Enjoy your new goodies!"
  },
  "wrote-a-review": {
    icon: "https://via.placeholder.com/40/FF0000/FFFFFF?text=Rev",
    title: "Wrote a Review",
    description: "We appreciate your feedback! Thanks for writing a review."
  }
};

/*********************************************************
  showAchievementPopup
**********************************************************
 This function:
 1. Updates the popup’s content (icon, title, description)
 2. Shows the popup by changing its "display" style
 3. Hides the popup after a few seconds (3 seconds in this example)
**********************************************************/
function showAchievementPopup(achievementKey) {
  const popup = document.getElementById('achievement-popup');
  const iconElement = document.getElementById('achievement-icon');
  const titleElement = document.getElementById('achievement-title');
  const descElement = document.getElementById('achievement-description');

  // Get the achievement info from our data object
  const achievement = achievementsData[achievementKey];
  if (!achievement) {
    console.warn(`Achievement data not found for key: ${achievementKey}`);
    return;
  }

  // Set the content
  iconElement.src = achievement.icon;
  titleElement.textContent = achievement.title;
  descElement.textContent = achievement.description;

  // Display the popup
  popup.style.display = 'block';

  // Hide the popup automatically after 3 seconds
  setTimeout(() => {
    popup.style.display = 'none';
  }, 3000);
}

/*********************************************************
  unlockAchievement
**********************************************************
 This function:
 1. Checks if the user has already unlocked the achievement
   (using localStorage).
 2. If not unlocked yet, we mark it as unlocked in localStorage and
    display the popup.
 3. If already unlocked, do nothing (or you could show a different
    message if you want).
**********************************************************/
function unlockAchievement(key) {
  const alreadyUnlocked = localStorage.getItem(key);

  if (!alreadyUnlocked) {
    // Mark achievement as unlocked in the browser's localStorage
    localStorage.setItem(key, 'true');

    // Show the popup
    showAchievementPopup(key);
  } else {
    // OPTIONAL: You could show a console log or do something else
    // if the user already has this achievement
    console.log(`Achievement "${key}" already unlocked.`);
  }
}

/*********************************************************
  (Optional) Auto-Unlock Achievements on Page Load
**********************************************************
 If you want to automatically unlock an achievement the first time
 someone ever visits the page, you can do so here. This is only
 triggered once per browser (because localStorage is per browser).
 
 For example: 
   unlockAchievement('first-visit');
**********************************************************/
window.addEventListener('load', () => {
  // Example: automatically unlock the "first-visit" achievement
  // whenever someone visits this page for the first time (in this browser).
  unlockAchievement('first-visit');
});

/*********************************************************
  debugClearAchievements
**********************************************************
 * This function removes all of the achievement keys
 * stored in localStorage, effectively resetting the user's
 * progress to "locked" for every achievement.
 * 
 * 1. Loops through each key in achievementsData.
 * 2. Calls localStorage.removeItem(key) to clear it.
 * 3. Logs a confirmation message, and shows an optional alert.
**********************************************************/
function debugClearAchievements() {
  for (const key in achievementsData) {
    localStorage.removeItem(key);
  }
  console.log("All unlocked achievements were cleared from localStorage.");
  alert("All unlocked achievements have been reset (cleared) for debugging!");
}
