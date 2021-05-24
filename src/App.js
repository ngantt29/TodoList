import React, { useEffect, useState } from "react";
import ToDoList from './components/ToDoList'
import NewTask from "./components/NewTask";
import { OPTIONS_PRIORITY } from './constants/constants'
import './assets/scss/_style.scss'
import { set } from "react-hook-form";

const App = () => {
  const [dataList, setDataList] = useState([]);
  const [detailData, setDetailData] = useState({});
  const [listChecked, setListChecked] = useState([])
  const [keyWord, setKeyWord] = useState('');

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
  
  useEffect(() => {
    handleSearch();
  }, [keyWord]);
   
  const handleChecked = (record) => {
    let _listChecked = [...listChecked];
    if (_listChecked.find((item) => record.id === item.id)) {
      _listChecked.splice(
        _listChecked.findIndex((item) => record.id === item.id),
        1
      );
    } else {
      _listChecked.push(record);
    }
    console.log("_listChecked: ", _listChecked);
    setListChecked(_listChecked);
  };
  
  const handleAddWork = (value) => {
    const _dataList = [...dataList];
    value["id"] = _dataList.length + 1;
    _dataList.unshift(value);
    localStorage.setItem("dataList", JSON.stringify(_dataList));
    setDataList(_dataList);
  }
  const handleChange = (e) => {
    setKeyWord(e.target.value);
  };

  const handleSearch = () => {
    const results = dataList.filter((item) =>
      item.titleTask.toLowerCase().includes(keyWord.toLowerCase())
    );
    setDataList(results);
  }
  const handleDetail = (record) => {
    if (JSON.stringify(detailData) !== "{}") {
      setDetailData({});
    } else {
      let workDetail = record.id
        ? dataList.find((item) => item.id === record.id)
        : null;
      setDetailData(workDetail);
    }
  };

  const handleRemove = (record) => {
    console.log('record:', record);
    let _dataList = [...dataList];
    _dataList = _dataList.filter((item) => record.id !== item.id);
    setDataList(_dataList);
    localStorage.setItem("dataList", JSON.stringify(_dataList));
  };

  const handleRemoveAll = (listChecked) => {
    // console.log("hihih", listChecked);
    let _dataList = [...dataList];
    // console.log('record', record);
    _dataList = _dataList.filter((item) => 
      !listChecked.includes(item)
    )
    console.log("_dataList", _dataList);
    setListChecked([]);
    setDataList(_dataList);
    localStorage.setItem("dataList", JSON.stringify(_dataList));
  };
  return (
    <div className="home d-flex container border">
      <NewTask options={OPTIONS_PRIORITY} handleAddWork={handleAddWork} />
      <ToDoList
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
      />
    </div>
  );
};
export default App;
