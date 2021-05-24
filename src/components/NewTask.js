import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { OPTIONS_PRIORITY } from "../constants/constants";
import { useForm, Controller } from "react-hook-form";
// import moment from "moment";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const NewTask = (props) => {
  const { checked, handleAddWork, detailData } = props;

  const formDefaultValue = useMemo(() => {
    if (JSON.stringify(detailData) !== '{}') {
      return {
        titleTask: detailData.titleTask,
        description: detailData.description,
        dueDate: new Date(detailData.dueDate),
        priority: detailData.priority,
      };
    } else {
      return {
        titleTask: "",
        description: "",
        dueDate: new Date(Date.now()),
        priority: 1,
      };
    }
  }, [detailData]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: formDefaultValue,
  });

  const onSubmitForm = (value) => {
    console.log("value: ", value);
    if (!checked) {
      handleAddWork(value);
      reset();
    }
  };
  
  return (
    <div className="new-task border-right">
      <h1 className="title text-center m-b-20">New Task</h1>
      <form className="add-task m-b-20">
        <input
          className="full-width padding-0-10 m-b-20"
          placeholder="Add new task..."
          {...register("titleTask", { required: true })}
        />{" "}
        <br />
        {errors.titleTask && errors.titleTask.type === "required" && (
          <span>Title task is required</span>
        )}
        <label>
          <b>Description</b>
        </label>
        <br />
        <textarea
          {...register("description")}
          className="full-width m-b-20"
          rows="5"
        />
        <div className="d-flex justify-content-between full-width m-b-20">
          <div className="new-task__date">
            <label>
              <b>Due Date</b>
            </label>{" "}
            <br />
            <Controller
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  selected={value}
                  onChange={(event) => onChange(event)}
                  dateFormat="dd/MM/yyyy"
                  
                />
              )}
              control={control}
              name="dueDate"
            />
            {/* <input {...register("dueDate")} type="date" /> */}
          </div>
          <div className="new-task__priority">
            <label>
              <b>Priority</b>
            </label>{" "}
            <br />
            <select
              {...register("priority", { valueAsNumber: true })}
              className="full-width"
              style={{ height: "32px" }}
            >
              {OPTIONS_PRIORITY.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <button
          className="button button--green m-b-20"
          type="submit"
          onClick={handleSubmit(onSubmitForm)}
        >
          {JSON.stringify(detailData) !== '{}' ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};
NewTask.propTypes = {
  checked: PropTypes.bool,
  handleAddWork: PropTypes.func,
  formAdd: PropTypes.any,
};
NewTask.defaultProps = {
  checked: false,
  options: [],
  handleAddWork: () => {},
  detailData: {}
};
export default React.memo(NewTask)
