import Error from "../../../components/Error";
import { useMainStore } from "../../../stores/MainStore/inde";

function NoNftError() {
  const { showError, setShowError } = useMainStore();
  return showError ? (
    <Error
      close={() => setShowError(false)}
      content="This Account dont have NFT"
    />
  ) : null;
}

export default NoNftError;
