import React from "react";
import "./PostCardStyles.css";

const Post = ({ profilePic, accountName, postImage, caption }) => {
  return (
    <div className="post-container">
      <img
        className="profile-pic"
        src={profilePic}
        alt={`${accountName}'s profile picture`}
      />
      <div className="post-content">
        <div className="account-name">{accountName}</div>
        <img
          className="post-image"
          src={postImage}
          alt={`${accountName}'s post`}
        />
        <div className="caption">{caption}</div>
      </div>
    </div>
  );
};

export default Post;
