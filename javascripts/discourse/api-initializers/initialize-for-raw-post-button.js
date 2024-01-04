import { ajax } from "discourse/lib/ajax";
import FullscreenCode from "discourse/components/modal/fullscreen-code";
import { apiInitializer } from "discourse/lib/api";
import { popupAjaxError } from "discourse/lib/ajax-error";

export default apiInitializer("0.8", (api) => {
  const currentUser = api.getCurrentUser();
  if (!currentUser) return;

  if (
    !(currentUser.staff || currentUser.trust_level >= settings.min_trust_level)
  ) {
    return;
  }

  api.addPostMenuButton("show-raw", () => ({
    async action({ post }) {
      try {
        const response = await ajax(`/posts/${post.id}/raw`, {
          dataType: "text",
        });
        api.container.lookup("service:modal").show(FullscreenCode, {
          model: {
            code: response,
          },
        });
      } catch (e) {
        popupAjaxError(e);
      }
    },
    icon: "file-alt",
    className: "raw-post",
    title: themePrefix("button_title"),
    position: "second-last-hidden",
  }));
});
