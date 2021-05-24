import React, { useEffect, useState } from "react";
import ToDoList from './components/ToDoList'
import NewTask from "./components/NewTask";
import { OPTIONS_PRIORITY } from './constants/constants'
import './assets/scss/_style.scss'

const App = () => {
  const [dataList, setDataList] = useState([]);
  const [detailData, setDetailData] = useState({});
  const [listChecked, setListChecked] = useState([]);
  // const [checked, setChecked] = useState(false)
  const [keyWord, setKeyWord] = useState('');
  // const [allowUpdate, setAllowUpdate] = useState(false)

  useEffect(() => {
    let _dataList = [];
    if (localStorage.getItem("dataList")) {
      _dataList = JSON.parse(localStorage.getItem("dataList"));
    } else {
      localStorage.setItem("dataList", []);
    }
    setDataList(_dataList);
    setListChecked([]);
  }, []);
   
  const handleChecked = (record,e) => {
    let _listChecked = [...listChecked];
    if (_listChecked.find((item) => record.id === item.id)) {
      _listChecked.splice(
        _listChecked.findIndex((item) => record.id === item.id),
        1
      );
    } else {
      _listChecked.push(record);
    }
    setListChecked(_listChecked);
  };
  
  const handleDetail = (record) => {
    if (JSON.stringify(detailData) !== "{}") {
      if (detailData.id === record.id) {
        setDetailData({});
      } else {
        setDetailData(record);
      }
    } else {
      setDetailData(record);
    }
    // console.log(new Date(record.dueDate));
  };

  const handleAddWork = (value) => {
    const _dataList = [...dataList];
    value["id"] = _dataList.length + 1;
    _dataList.unshift(value);
    const _dataListSorted = _dataList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    // console.log("_dataListSorted",_dataListSorted);
    setDataList(_dataListSorted);
    localStorage.setItem("dataList", JSON.stringify(_dataListSorted));
  }

  const handleUpdateWork = (value) => {
    // console.log('update', detailData);
    let _dataList = [...dataList];
    _dataList = _dataList.map(item => {
      if (item.id === detailData.id) {
        item.titleTask = value.titleTask;
        item.description = value.description;
        item.dueDate = value.dueDate;
        item.priority = value.priority;
        setDetailData(item);
      }
      return item;
    })
    localStorage.setItem("dataList", JSON.stringify(_dataList));
    const _dataListSorted = _dataList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    // console.log("_dataListSorted", _dataListSorted);
    setDataList(_dataListSorted);
    localStorage.setItem("dataList", JSON.stringify(_dataListSorted));
  };

  const handleChange = (e) => {
    setKeyWord(e.target.value);
  };

  const handleSearch = () => {
    let _dataList = JSON.parse(localStorage.getItem("dataList"));
    const results = _dataList.filter((item) =>
      item.titleTask.toLowerCase().includes(keyWord.toLowerCase())
    );
    setDataList(results);
  }

  const handleRemove = (record) => {
    let _dataList = [...dataList];
    _dataList = _dataList.filter((item) => record.id !== item.id);
    setDataList(_dataList);
    localStorage.setItem("dataList", JSON.stringify(_dataList));
  };

  const handleRemoveAll = (listChecked) => {
    let _dataList = [...dataList];
    _dataList = _dataList.filter((item) => 
      !listChecked.includes(item)
    )
    setListChecked([]);
    setDataList(_dataList);
    localStorage.setItem("dataList", JSON.stringify(_dataList));
  };
  return (
    <div className="home d-flex container border">
      <NewTask
        options={OPTIONS_PRIORITY}
        handleAddWork={handleAddWork}
        // handleUpdateWork={handleUpdateWork}
        // allowUpdate={allowUpdate}
      />
      <ToDoList
        // checked={checked}
        handleChecked={handleChecked}
        dataList={dataList}
        detailData={detailData}
        handleDetail={handleDetail}
        listChecked={listChecked}
        handleRemove={handleRemove}
        handleRemoveAll={handleRemoveAll}
        handleChange={handleChange}
        handleSearch={handleSearch}
        keyWord={keyWord}
        handleUpdateWork={handleUpdateWork}
      />
    </div>
  );
};
export default App;
