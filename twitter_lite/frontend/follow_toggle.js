let APIUtil = require('./api_util');

class FollowToggle {
  constructor(el){
    this.$el = $(el);
    this.userId = this.$el.data("user-id");
    this.followState = this.$el.data("initial-follow-state");
    this.render();
    this.bindEventHandler();
  }

  bindEventHandler() {
    this.$el.on("click", this.handleClick.bind(this));
  }

  render(){
    let btnText;
    if (this.followState === 'followed'){
      btnText = 'Unfollow!';
    } else if (this.followState === 'unfollowed'){
      btnText = 'Follow!';
    }
    this.$el.text(btnText);
  }

  updateFollowState() {
    if (this.followState === "unfollowed") {
      this.followState = 'followed';
    } else {
      this.followState = 'unfollowed';
    }
  }

  setDisabledBtnState() {
    if (this.followState === "unfollowed") {
      this.$el.text("following...");
    } else if (this.followState === "followed") {
      this.$el.text("unfollowing...");
    }
    this.$el.prop("disabled", true);
  }

  handleClick() {
    console.log(`Before AJAX request => ${this.followState}`);
    let that = this;
    this.setDisabledBtnState();

    if (this.followState === 'followed') {
      APIUtil.unfollowUser(this.userId)
        .then((res) => {
          this.$el.prop("disabled", false);
          that.updateFollowState();
          that.render();
          console.log(`handleClick DELETE result: ${res}`);
        });
    } else if (this.followState === 'unfollowed') {
      APIUtil.followUser(this.userId)
        .then((res) => {
          this.$el.prop("disabled", false);
          that.updateFollowState();
          that.render();
          console.log(`handleClick POST result: ${res}`);
        });
    }
  }
}

module.exports = FollowToggle;
