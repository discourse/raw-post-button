import discourseComputed from "discourse-common/utils/decorators";
import Controller from "@ember/controller";
import ModalFunctionality from "discourse/mixins/modal-functionality";

export default Controller.extend(ModalFunctionality, {
  rawPost: null,
  loading: true,

  init() {
    this._super(...arguments);
    this.addObserver("model.shareUrl", () => {
      this._resetRaw();
      this._setRaw();
    });
  },

  _setRaw() {
    const httpRequest = new XMLHttpRequest();
    if (!httpRequest) return;

    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState !== XMLHttpRequest.DONE) return;

      if (httpRequest.status === 200) {
        this.setProperties({
          loading: false,
          rawPost: httpRequest.responseText
        });
      } else {
        this.setProperties({
          loading: false,
          rawPost: I18n.t(themePrefix("loading_error_message"))
        });
      }
    };

    const withoutShareParam = this.model.shareUrl.split("?").shift();
    const splitUrl = withoutShareParam.split("/");
    let rawLink;

    if (splitUrl.length === 4) {
      rawLink = splitUrl.pop();
    } else {
      rawLink = splitUrl.slice(-2).join("/");
    }

    httpRequest.open("GET", `/raw/${rawLink}`);
    httpRequest.send();
  },

  _resetRaw() {
    this.setProperties({
      loading: true,
      rawPost: null
    });
  }
});
