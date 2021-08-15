import React from "react";

function ProfilePicUpload(props) {
  const onChange = (e) => {
    props.setFile(e.target.files[0]);
    props.setFilename(e.target.files[0].name);
    props.setFilePreview(URL.createObjectURL(e.target.files[0]));
  };

  const resetFile = (e) => {
    e.preventDefault();
    props.setFilePreview(null);
    props.setFile(null);
    props.setFilename(null);
  };

  const style = {
    borderRadius: "150px",
    boxShadow: "0px 7px 13px black",
  };

  return (
    <div className="row mb-2">
      <div className="col-2">
        <p>Member Profile Picture</p>
      </div>
      <div className="col-4">
        {props.filePreview && (
          <img
            style={style}
            src={props.filePreview}
            width="200px"
            height="200px"
          />
        )}
      </div>
      <div className="col-5 mt-5">
        <form onSubmit={props.onImageSubmit}>
          <div className="custom-file">
            <input
              type="file"
              name="csvFile"
              className="custom-file-input"
              id="csvFile"
              onChange={onChange}
            />
            <label className="custom-file-label" htmlFor="csvFile">
              {props.filename}
            </label>
          </div>
          <div className="row mt-2">
            {props.filePreview && (
              <>
                <div className="col-6"></div>
                <div className="col-6">
                  <button
                    type="reset"
                    className="btn btn-danger"
                    style={{ width: "100%" }}
                    onClick={resetFile}
                  >
                    Remove
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePicUpload;
