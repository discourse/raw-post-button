# frozen_string_literal: true

RSpec.describe "Raw post button", system: true do
  let!(:theme) { upload_theme_component }

  let(:user) { Fabricate(:user) }

  it "should display the component" do
    post = Fabricate(:post, raw: "**This is a test post**")

    sign_in user
    visit "/t/#{post.topic_id}"


    # test if the button is hidden by default
    expect(page).to have_no_css(".post-controls .actions .post-action-menu__raw-post")

    # expand the buttons and click in raw post
    find(".post-controls .actions .post-action-menu__show-more").click
    find(".post-controls .actions .post-action-menu__raw-post").click

    expect(page).to have_css(".fullscreen-code-modal")
    expect(find(".fullscreen-code-modal code")).to have_text("**This is a test post**")
  end
end
