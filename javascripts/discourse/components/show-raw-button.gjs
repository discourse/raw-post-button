import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import DButton from "discourse/components/d-button";
import FullscreenCode from "discourse/components/modal/fullscreen-code";
import { ajax } from "discourse/lib/ajax";
import { popupAjaxError } from "discourse/lib/ajax-error";

export default class ShowRawButton extends Component {
  static hidden = true;

  @service modal;

  @action
  async showRaw() {
    try {
      const response = await ajax(`/posts/${this.args.post.id}/raw`, {
        dataType: "text",
      });
      this.modal.show(FullscreenCode, {
        model: {
          code: response,
        },
      });
    } catch (e) {
      popupAjaxError(e);
    }
  }

  <template>
    <DButton
      class="post-action-menu__raw-post raw-post"
      ...attributes
      @action={{this.showRaw}}
      @icon="file-lines"
      @label={{if this.args.showLabel (themePrefix "button_label")}}
      @title={{themePrefix "button_title"}}
    />
  </template>
}
