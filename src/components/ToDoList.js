import React from "react";
import PropTypes from "prop-types";
import NewTask from "./NewTask";

const ToDoList = (props) => {
  const {
    handleChecked,
    dataList,
    detailData,
    handleDetail,
    handleRemove,
    listChecked,
    handleRemoveAll,
    handleSearch,
    handleChange,
    keyWord
  } = props;
  // useEffect(() => {
  //   console.log("detailData", detailData);
  // }, [detailData]);
  return (
    <div className="todo-list">
      <div className="todo-list__body">
        <h1 className="title text-center">To Do List</h1>
        <input
          className="padding-0-10 full-width m-b-20"
          type="text"
          placeholder="Search"
          value={keyWord}
          onChange={handleChange}
          onKeyDown={(value) => handleSearch(value)}
        />
        {dataList.map((item, id) => {
          return (
            <div key={id} className="todo-list__item border">
              <div className="todo-list__item__header d-flex-center justify-content-between">
                <div className="d-flex-center justify-content-start">
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleChecked(item);
                    }}
                  />
                  {item.titleTask}
                </div>
                <div
                  className="d-flex justify-content-end"
                  style={{ width: "50%" }}
                >
                  <button
                    className="button button--blue"
                    onClick={() => {
                      handleDetail(item);
                    }}
                  >
                    Detail
                  </button>
                  <button
                    className="button button--red"
                    onClick={() => {
                      handleRemove(item);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
              {detailData.id === item.id && (
                <div className="todo-list__item__body">
                  <NewTask detailData={detailData} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {listChecked && listChecked.length > 0 && (
        <div className="todo-list__bottom d-flex-center justify-content-between">
          <div className="d-flex-center justify-content-start">
            Bulk Action:
          </div>
          <div className="d-flex justify-content-end" style={{ width: "40%" }}>
            <button className="button button--blue">Done</button>
            <button
              className="button button--red"
              onClick={() => {
                handleRemoveAll(listChecked);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
ToDoList.propTypes = {
  handleChecked: PropTypes.func,
  detailData: PropTypes.object,
  handleDetail: PropTypes.func,
  handleRemove: PropTypes.func,
  listChecked: PropTypes.array,
  handleRemoveAll: PropTypes.func,
  handleSearch: PropTypes.func,
  handleChange: PropTypes.func,
  keyWord: PropTypes.string,
};
export default React.memo(ToDoList)
