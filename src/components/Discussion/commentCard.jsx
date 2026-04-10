import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import parse from "html-react-parser";
import Reply from "./reply";

const imageUrlRegex = /\b(https?:\/\/[^\s]+)/g;

const CommentCard = ({ value, deleteComment }) => {
  const { _id, name, rating, content } = value;

  const [isOpen, setIsOpen] = useState(false);
  const [reply, setReply] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [replyBox, setReplyBox] = useState(false);

  const addReply = (name, comment) => {
    setReply((prev) => [...prev, { name, comment }]);
    setIsOpen(false);
  };

  const deleteReply = (index) => {
    setReply((prev) => prev.filter((_, i) => i !== index));
  };

  const imageUrl = content?.match(imageUrlRegex)?.[0];

  return (
    <>
      <div className="comment-boxes">
        <div className="review">
          <div className="top-area">
            <div className="comment-left">
              <div className="name" data-testid="names">{name}</div>
              <div className="rating" data-testid="ratings">{rating}⭐️</div>
            </div>

            <div
              className="add-icon"
              data-testid="toggle-btn"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? "-" : "+"}
            </div>
          </div>

          {toggle && (
            <>
              <div className="comment" data-testid="comments">
                {parse(content?.replace(imageUrlRegex, ""))}
              </div>

              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="comment"
                  className="image-text-editor"
                  style={{ width: "150px" }}
                />
              )}

              <div className="buttons">
                <button
                  type="button"
                  className="reply"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div className="reply-btn">Reply</div>
                </button>

                <button className="reply-count">
                  <div
                    className="view-reply"
                    onClick={() => setReplyBox(!replyBox)}
                  >
                    {replyBox ? "Hide Reply" : "Show Reply"} ({reply.length})
                  </div>
                </button>

                <button className="delete" onClick={deleteComment}>
                  <AiFillDelete />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {isOpen && <Reply onAdd={addReply} />}

      {replyBox &&
        reply.map(({ name, comment }, index) => (
          <div className="reply-section" key={index}>
            <div className="comment-boxes">
              <div className="review">
                <div className="top-area">
                  <div className="name">{name}</div>
                </div>

                <div className="comment">{parse(comment)}</div>

                <div className="buttons">
                  <button
                    className="delete"
                    onClick={() => deleteReply(index)}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default CommentCard;