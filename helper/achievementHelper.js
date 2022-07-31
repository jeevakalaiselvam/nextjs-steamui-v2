export const XP_FOR_LEVEL = 1000;

export const calculateXPFromPercentage = (percentage) => {
  if (percentage <= 5) {
    return 500;
  } else if (percentage <= 10 && percentage > 5) {
    return 250;
  } else if (percentage <= 25 && percentage > 10) {
    return 100;
  } else if (percentage <= 50 && percentage > 25) {
    return 75;
  } else if (percentage <= 75 && percentage > 50) {
    return 50;
  } else {
    return 25;
  }
};

export const getAllXPFromAchievements = (achievements) => {
  console.log("ACHIEVEMENTS", achievements);
  let xpData = { totalXP: 0, completedXP: 0, remainingXP: 0 };
  const { totalXP, completedXP, remainingXP } = xpData;
  achievements.forEach((achievement) => {
    totalXP = totalXP + +calculateXPFromPercentage(+achievement.percent);
    if (+achievement.achieved == 0) {
      remainingXP =
        remainingXP + +calculateXPFromPercentage(+achievement.percent);
    }
    if (+achievement.achieved == 1) {
      completedXP =
        completedXP + +calculateXPFromPercentage(+achievement.percent);
    }
  });
  return { totalXP, completedXP, remainingXP };
};

export const formatAchievements = (
  schemaAchievements,
  globalAchievements,
  playerAchievements,
  hiddenAchievements
) => {
  console.log("ALL TYPE ACHIEVEMENTS", {
    schemaAchievements,
    globalAchievements,
    playerAchievements,
    hiddenAchievements,
  });

  if (
    schemaAchievements &&
    schemaAchievements.length > 0 &&
    globalAchievements &&
    globalAchievements.length > 0 &&
    playerAchievements &&
    playerAchievements.length > 0 &&
    hiddenAchievements &&
    hiddenAchievements.length > 0
  ) {
    let formattedAchievementsArray = [];
    let formattedAchievements = {};

    if (schemaAchievements && schemaAchievements.length > 0) {
      schemaAchievements.forEach((schemaAchievement) => {
        formattedAchievements[schemaAchievement.name] = schemaAchievement;
      });
      globalAchievements.forEach((globalAchievement) => {
        formattedAchievements[globalAchievement.name] = {
          ...formattedAchievements[globalAchievement.name],
          ...globalAchievement,
        };
      });
      playerAchievements.forEach((playerAchievement) => {
        formattedAchievements[playerAchievement.apiname] = {
          ...formattedAchievements[playerAchievement.apiname],
          ...playerAchievement,
        };
      });

      formattedAchievementsArray = Object.keys(formattedAchievements).map(
        (key) => formattedAchievements[key]
      );

      formattedAchievementsArray = formattedAchievementsArray.map(
        (oldAchievement) => {
          let newAchievement = { ...oldAchievement };
          const { displayName } = newAchievement;
          const targetAchievement = hiddenAchievements.find(
            (hiddenAchievement) => {
              if (
                hiddenAchievement.name.trim().toLowerCase() ==
                displayName.trim().toLowerCase()
              ) {
                return true;
              }
            }
          );
          newAchievement = {
            ...newAchievement,
            hiddenDescription: targetAchievement.description,
          };
          return newAchievement;
        }
      );
    }
    return formattedAchievementsArray;
  } else {
    return [];
  }
};

export const getPhaseFilteredAchievements = (gameId, achievements, phase) => {
  console.log("GOT For PHASE ", phase, " DATA ", achievements);
  let newAchievements = [];
  if (achievements.length > 0) {
    newAchievements = achievements.filter((achievement) => {
      if (typeof window !== "undefined") {
        if (
          (JSON.parse(
            localStorage.getItem(`${gameId}_${achievement.name}_PHASE`)
          ) || "1") == phase
        ) {
          return achievement;
        }
      }
    });
  }
  console.log("For PHASE ", phase, " RETURNING ", newAchievements);
  return newAchievements;
};
