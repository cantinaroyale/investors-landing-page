const createGameActions = (gameInstance: any) => {
  const bodyParts = "BAYCBodyParts";
  return {
    prevWeapon: () => gameInstance.SendMessage(bodyParts, "PreviousWeapon"),
    nextWeapon: () => gameInstance.SendMessage(bodyParts, "NextWeapon"),
    prevHeadAccessory: () =>
      gameInstance.SendMessage(bodyParts, "PreviousHeadAccessory"),
    nextHeadAccessory: () =>
      gameInstance.SendMessage(bodyParts, "NextHeadAccessory"),
    prevFurColor: () =>
      gameInstance.SendMessage(bodyParts, "PreviousSkinColor"),
    nextFurColor: () => gameInstance.SendMessage(bodyParts, "NextSkinColor"),
  };
};

export { createGameActions };
