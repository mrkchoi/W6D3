


const APIUtil = {
  followUser: id => {
    return $.ajax({
      url: `/users/${id}/follow`,
      type: "POST",
      dataType: "json",
      success: function (result) {
        console.log("post successful");
        console.log(`APIUtil POST result: ${result}`);
      }
    });
  },
  
  unfollowUser: id => {
    return $.ajax({
      url: `/users/${id}/follow`,
      type: "DELETE",
      dataType: "json",
      success: function (result) {
        console.log(`APIUtil delete result: ${result}`);
        console.log(result);
      }
    });
  }
};

module.exports = APIUtil;