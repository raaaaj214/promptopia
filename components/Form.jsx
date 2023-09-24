import Link from "next/link"
import "@styles/form.css";

const Form = ({ type,
  post,
  setPost,
  submitting,
  handleSubmit}) => {
  return (
    <section className="form">
      <h1 className="form-heading">{type} Post</h1>
      <p className="form-p">
        {type} and Share amazing prompts with the world and let your imagination run wild with any AI-powered platform
      </p>

      <form onSubmit={handleSubmit} className="form-form">
        <label htmlFor="">
          <span className="form-label">Your AI Prompt</span>

        <textarea value={post.prompt} onChange={(e) => setPost({...post, prompt : e.target.value})} 
        placeholder="Write your prompt here"
        required
        className="form-textarea"
        ></textarea>
        </label>

        <label htmlFor="">
          <span className="form-label">Tag {`   `}
          <span>(#product,#webdevelopment,#idea)</span>
          </span>

        <input value={post.tag} onChange={(e) => setPost({...post, tag : e.target.value})} 
        placeholder="#tag"
        required
        className="form-input"
        />
        </label>

        <div className="form-btns">
          <Link href="/" className="form-cancel">Cancel</Link>
          <button type="submit" disabled={submitting}
          className="form-submit"
          >{submitting ? `${type}...` : type }</button>
        </div>
      </form>
    </section>
  )
}

export default Form
