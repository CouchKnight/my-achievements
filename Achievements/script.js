// Example achievements data structure
const achievements = {
  "first-visit": {
    icon: "images/note.png",
    text: "You visited the page for the first time!"
  },
  "made-a-purchase": {
    icon: "images/purchase-icon.png",
    text: "You made a purchase!"
  }
};

// Function to display the popup
function showAchievementPopup(iconUrl, text) {
  const popup = document.getElementById("achievement-popup");
  const popupIcon = document.getElementById("achievement-icon");
  const popupText = document.getElementById("achievement-text");

  popupIcon.src = iconUrl;
  popupText.textContent = text;
  popup.style.display = "block";

  // Hide popup automatically after 3 seconds
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}

// Function to unlock an achievement
function unlockAchievement(key) {
  // If you want localStorage checking, do it here
  const unlocked = localStorage.getItem(key);
  if (!unlocked) {
    localStorage.setItem(key, "true");
    const ach = achievements[key];
    if (ach) {
      showAchievementPopup(ach.icon, ach.text);
    }
  }
}

// Example: automatically unlock “first-visit” once the page loads
window.addEventListener("load", () => {
  unlockAchievement("first-visit");
});
