import React, { useEffect, useState, useCallback } from "react";
import { Table, Input, Button, message, Card, Pagination, Modal } from "antd";
import Wrapper from "../../common/Wrapper";
import { ReloadOutlined } from "@ant-design/icons";
import CreateSpamHotline from "./CreateCampaign";
import MockService from "../../services/mock.service";
import SpamAPI from "../../api/campaign.api"
import { COLUMN_CONFIG } from './table.config';
import {convertDateByFormat} from '../../helper/convert-date.helper'
import {DATE_TIME_FORMAT} from '../../const/date-time.const'
import {getDataByParams} from './campaign.helper'
const { Search } = Input;

export default function Campaign() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [searchTxt, setSearchTxt] = useState("");
  const [total, setTotal] = useState(0);
  const [searchData, setSearchData] = useState([])
   
const getListData = useCallback(async () => {
    setLoading(true);
    const response = await SpamAPI.getAllSpamList();
    console.log(response)

    setLoading(false);
    setData(response.data.hotline);
    console.log(response.data.hotline)
    setTotal(response.data?.hotline?.length);
    //setSearchData(mapdata)
    
    
  }, []);
  
  useEffect(() => {
    getListData();
  }, [getListData]);

  const handlePageChange = (value) => {
    setLoading(true);
    setPage(value);
  };


  const handleSearch = (value) => {
    if (value !== searchTxt) {

      const params = {
        
        page: page,
        search: value,
      };
      const result = getDataByParams(params,data)
      setSearchData(result.data)
      setTotal(result.total)
      setPage(1);
      setSearchTxt(value.trim());

    }
  };

  

  const refreshPage = () => {
    window.location.reload();
  };
  console.log(searchData)
  return (
    <Wrapper>
      <Card
        extra={
          <>
            <div style={{ display: "flex" }}>
              <Search
                placeholder="Nhập số hotline"
                onSearch={handleSearch}
                style={{ width: 300 }}
                enterButton="Search"
              />
              <Button
                icon={<ReloadOutlined />}
                style={{
                  marginLeft: 5,
                  width: 120,
                  backgroundColor: "orange",
                  color: "white",
                }}
                onClick={() => refreshPage()}
              >
                Refresh
              </Button>
              <CreateSpamHotline />
            </div>
          </>
        }
      > 
        <Table
          dataSource={data}
          columns={COLUMN_CONFIG}
          pagination={false}
          loading={loading}
          scroll={{ x: "max-content" }}
        />
        <Pagination
          style={{ float: "right", marginTop: 10 }}
          pageSize={10}
          total={total}
          current={page}
          onChange={handlePageChange}
        />
      </Card>
    </Wrapper>
  );
}
