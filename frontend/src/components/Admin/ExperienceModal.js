/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addExperience,
  updateExperience,
} from "../../actions/experienceAction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ExperienceModal = ({ id, header, exp, submitValue, colorButton }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.login.id);

  useEffect(() => {
    if (id === "editExperience") {
      setValue("title", exp.title);
      setValue("company", exp.company);
      setValue("city", exp.city);
      setStartDate(Date.parse(exp.startDate));
      setEndDate(Date.parse(exp.endDate));
      setValue("description", exp.description);
      setValue("technologies", exp.technologies);
    }
  }, [exp, id, setValue]);

  const onClick = (data) => {
    data.startDate = startDate;
    data.endDate = endDate;
    data.userId = userId;
    if (id === "editExperience") {
      dispatch(updateExperience(exp._id, data));
      reset();
    } else {
      setValue("userId", userId);
      dispatch(addExperience(data));
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
                                required: "This field is required"
                              })}
                            />
                            {errors?.title != undefined && (
                              <div className="text-danger ms-4">
                                {errors?.title?.message}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="md-form mb-0">
                            <label htmlFor="school" className="">
                              Company
                            </label>
                            <input
                              type="text"
                              id="company"
                              name="company"
                              className="form-control shadow-none"
                              {...register("company", {
                                required: "This field is required"
                              })}
                            />
                            {errors?.company != undefined && (
                              <div className="text-danger ms-4">
                                {errors?.company?.message}
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
                              className="form-control shadow-none"
                              {...register("city", {
                                required: "This field is required"
                              })}
                            />
                            {errors?.city != undefined && (
                              <div className="text-danger ms-4">
                                {errors?.city?.message}
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
                        <div className="col-md-12">
                          <div className="md-form">
                            <label htmlFor="message">Description</label>
                            <textarea
                              type="text"
                              name="description"
                              id="description"
                              rows="3"
                              className="form-control md-textarea shadow-none"
                              {...register("description")}
                            />
                            {errors?.description != undefined && (
                              <div className="text-danger ms-4">
                                {errors?.description?.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="md-form mb-0">
                            <label htmlFor="city" className="">
                              Skills
                            </label>
                            <input
                              type="text"
                              id="technologies"
                              name="technologies"
                              className="form-control shadow-none"
                              {...register("technologies", {
                                required: "This field is required"
                              })}
                            />
                            {errors?.technologies != undefined && (
                              <div className="text-danger ms-4">
                                {errors?.technologies?.message}
                              </div>
                            )}
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
                // data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className={`btn btn-${colorButton} shadow-none`}
                // data-bs-dismiss="modal"
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

export default ExperienceModal;
