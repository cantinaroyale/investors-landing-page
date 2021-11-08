import { createGameActions } from "../util";
import ControllerAction from "./ControllerAction";
const actions = createGameActions();

function ApeController() {
  return (
    <div className="game-controller">
      <h3 className="game-controller-title">Set the actions</h3>
      <ControllerAction
        text="Fur Color"
        prev={actions.prevFurColor}
        next={actions.nextFurColor}
      />
      <ControllerAction
        text={
          <>
            Head <br /> Accessory
          </>
        }
        prev={actions.prevHeadAccessory}
        next={actions.nextHeadAccessory}
      />
      <ControllerAction
        text="Weapon"
        prev={actions.prevWeapon}
        next={actions.nextWeapon}
      />
    </div>
  );
}

export default ApeController;
