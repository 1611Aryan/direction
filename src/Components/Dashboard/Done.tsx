import success from "./../../Media/check.png"
import failure from "./../../Media/decline.png"

const Done: React.FC<{
  done: {
    done: boolean
    success: boolean
    message: string
  }
}> = ({ done }) => {
  return (
    <div className="done">
      <div className="content">
        <img src={done.success ? success : failure} alt="" />

        {done.success ? (
          <p>
            <span className="thanks">Thanks for filling out the form</span>
            <br />
            We will Get back to you soon!
          </p>
        ) : (
          <p>{done.message}</p>
        )}
      </div>
    </div>
  )
}

export default Done
