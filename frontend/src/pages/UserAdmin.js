/* eslint-disable eqeqeq */
import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../actions/loginAction";
import { useForm } from "react-hook-form";
import { domainName } from "../apis/serverApi";

function UserAdmin() {
  const users = useSelector((state) => state.login.user);
  console.log({ users })
  const dispatch = useDispatch();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    setValue("username", users.username);
    setValue("email", users.email);
    setValue("name", users.name);
    setValue("jobTitle", users.jobTitle);
    setValue("jobDescription", users.jobDescription);
    setValue("aboutSectionTitle", users.aboutSectionTitle);
    // setValue("aboutSectionContent", String(users.aboutSectionContent).replace(/<br\s*\/?>/gi,'\\n'));
    setValue("aboutSectionContent", String(users.aboutSectionContent).replace(/<br\s*\/?>/gi, '\n'));
    // setValue("aboutSectionContent", users.aboutSectionContent);
    setValue("phone", users.phone);
    setValue("address", users.address);
    console.log("hi")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const values = [
    { header: 'Username', property: 'username', textArea: false, columns: 6, disabled: true },
    { header: 'Name', property: 'name', textArea: false, columns: 6, disabled: true },
    { header: 'Email', property: 'email', textArea: false, columns: 6, disabled: true },
    { header: 'Job Title', property: 'jobTitle', textArea: false, columns: 6 },
    { header: 'Job Description', property: 'jobDescription', textArea: true, columns: 12, lines: 1 },
    { header: 'About Section Title', property: 'aboutSectionTitle', textArea: false, columns: 12 },
    { header: 'About Section Content', property: 'aboutSectionContent', textArea: true, columns: 12, lines: 12 },
    { header: 'Phone', property: 'phone', textArea: false, columns: 6 },
    { header: 'Address', property: 'address', textArea: false, columns: 6 },
  ]

  const onClick = (data) => {

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("jobTitle", data.jobTitle);
    formData.append("jobDescription", data.jobDescription);
    formData.append("aboutSectionImage", data.aboutSectionImage[0]);
    formData.append("aboutSectionTitle", data.aboutSectionTitle);
    formData.append("aboutSectionContent", data.aboutSectionContent.replace(/\n/g, "<br />"));
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    dispatch(updateUser(users._id, formData));
    reset();
  };

  return (

    <div className="container">
      <div className="d-flex justify-content-end mt-5 me-5">
        <h3 className="me-auto">User Details</h3>
        <button
          type="button"
          className="btn btn-success shadow-none  ms-auto"
          onClick={handleSubmit(onClick)}
        >
          Edit
        </button>
      </div>
      <div>
        <div class="mt-4 alert alert-success" role="alert">
          Your portfolio link is at <a href={`${process.env.REACT_APP_FRONTEND_ENV}/${users?.username}`}>{process.env.REACT_APP_FRONTEND_ENV}{users?.username}</a>
        </div>
        <form>
          <div className="row w-lg-75 py-5">
            <img
              width={100} height={100}
              style={{ objectFit: "contain" }}
              alt={users?.username}
              src={`${domainName}${users?.aboutSectionImage}`} />
            {
              values.map(({ header, property, columns, textArea, lines, disabled }) => {
                return (
                  <Fragment key={header + property}>
                    <div className={`col-lg-${columns} mb-0`}>
                      <label htmlFor={property} className="mb-2">
                        {header}
                      </label>
                      {textArea == false ?
                        <input
                          type="name"
                          id={property}
                          {...((disabled && disabled === true) ? { disabled } : {})}
                          name={property}
                          className="form-control shadow-none mb-2"
                          {...register(property, {
                            required: "This field is required"
                          })}

                        />
                        : <textArea
                          style={{
                            whiteSpace: "pre-wrap"
                          }}
                          type="name"
                          id={property}
                          name={property}
                          rows={lines}
                          className="form-control shadow-none mb-2"
                          {...register(property, {
                            required: "This field is required"
                          })}

                        />

                      }
                      {errors[property] != undefined && (
                        <div className="text-danger ms-4">
                          {errors[property].message}
                        </div>
                      )}
                    </div>
                  </Fragment>
                )
              })}

            <div className="md-form mb-0">
              <label htmlFor="link" className="">
                Image
              </label>
              <input
                type="file"
                id="userImage"
                name="userImage"
                className="form-control shadow-none"
                multiple={false}
                {...register("aboutSectionImage")}
              />
              {errors?.userImage != undefined && (
                <div className="text-danger ms-4">
                  {errors?.userImage?.message}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>

    </div>

  );
}

export default UserAdmin;
