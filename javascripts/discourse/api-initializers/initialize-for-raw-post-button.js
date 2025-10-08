import { apiInitializer } from "discourse/lib/api";
import ShowRawButton from "../components/show-raw-button";

export default apiInitializer((api) => {
  const currentUser = api.getCurrentUser();
  if (!currentUser) {
    return;
  }

  if (
    !(currentUser.staff || currentUser.trust_level >= settings.min_trust_level)
  ) {
    return;
  }

  api.registerValueTransformer(
    "post-menu-buttons",
    ({
      value: dag,
      context: { lastHiddenButtonKey, secondLastHiddenButtonKey },
    }) => {
      dag.add("show-raw", ShowRawButton, {
        before: lastHiddenButtonKey,
        after: secondLastHiddenButtonKey,
      });
    }
  );
});
