const createGameActions = () => {
  const gameInstance = (window as any).gameInstance;
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
    setFur: (index: number) =>
      gameInstance.SendMessage(bodyParts, "ChangeSkinExternal", index),
  };
};

export { createGameActions };
