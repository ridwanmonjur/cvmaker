import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addEducation, updateEducation } from "../../actions/educationAction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EducationModal = ({ id, header, edu, submitValue, colorButton }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.login.id);
  useEffect(() => {

    if (id === "editEducation") {
      setValue("title", edu.title);
      setValue("school", edu.school);
      setValue("city", edu.city);
      setStartDate(Date.parse(edu.startDate));
      setStartDate(Date.parse(edu.endDate));
    }
  }, [edu, id, setValue, userId]);

  const onClick = (data) => {
    data.startDate = startDate;
    data.endDate = endDate;
    data.userId = userId;
    console.log({ errors })
    if (id === "editEducation") {
      dispatch(updateEducation(edu._id, data));
      reset();
    } else {
      setValue("userId", userId);
      dispatch(addEducation(data));
      reset();

    }
  };
  return (
    <div>
      <div
        className="modal fade"
        id={id}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {header}
              </h5>
              <button
                type="button"
                className="btn-close shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <div className="row">
                  <div className="col-md-12 mb-md-0 mb-5 px-md-5">
                    <form>
                      <div className="row py-md-2">
                        <div className="col-md-12">
                          <div className="md-form mb-0">
                            <label htmlFor="title" className="">
                              Title
                            </label>
                            <input
                              type="text"
                              id="title"
                              name="title"
                              className="form-control shadow-none"
                              {...register("title", {
                                required: true
                              })}
                            />
                            {errors?.title && errors?.title?.type === "required" && (
                              <div className="text-danger ms-4">
                                You must enter your title
                              </div>
                            )}
                          </div>

                        </div>

                        <div className="col-md-12">
                          <div className="md-form mb-0">
                            <label htmlFor="school" className="">
                              School
                            </label>
                            <input
                              type="text"
                              id="school"
                              name="school"
                              className="form-control shadow-none"
                              {...register("school", {
                                required: true
                              })}
                            />
                            {errors?.school && errors?.school?.type === "required" && (
                              <div className="text-danger ms-4">
                                You must enter your school
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="md-form mb-0">
                            <label htmlFor="city" className="">
                              City
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              title="Submit your city"
                              className="form-control shadow-none"
                              {...register("city", {
                                required: true
                              })}
                            />
                            {errors?.city && errors?.city?.type === "required" && (
                              <div className="text-danger ms-4">
                                You must enter your city
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="md-form mb-0">
                            <label htmlFor="school" className="">
                              Start Date
                            </label>
                            <DatePicker
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="md-form mb-0">
                            <label htmlFor="school" className="">
                              End Date
                            </label>
                            <DatePicker
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary shadow-none"
                x              >
                Close
              </button>
              <button
                type="button"
                className={`btn btn-${colorButton} shadow-none`}
                onClick={handleSubmit(onClick)}
              >
                {submitValue}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationModal;
