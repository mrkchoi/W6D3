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

  handleClick(){
    console.log(`Before AJAX request => ${this.followState}`);
    let that = this;
    if (this.followState === 'followed') {
      $.ajax({
        url: `/users/${this.userId}/follow`,
        type: "DELETE",
        dataType: "json",
        success: function(result) {
          console.log("delete successful");
          that.updateFollowState();
          that.render();
        }
      });
    } else if (this.followState === 'unfollowed') {
      $.ajax({
        url: `/users/${this.userId}/follow`,
        type: "POST",
        dataType: "json",
        success: function (result) { 
          console.log("post successful");
          that.updateFollowState();
          that.render();
        }
      });
    }
  }
}

module.exports = FollowToggle;