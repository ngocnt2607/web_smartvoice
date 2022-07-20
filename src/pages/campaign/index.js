import { DeleteOutlined, ReloadOutlined, WarningTwoTone } from "@ant-design/icons";
import { Button, Card, Input, Pagination, Table } from "antd";
import confirm from "antd/lib/modal/confirm";
import React, { useCallback, useEffect, useState } from "react";
import SpamAPI from "../../api/campaign.api";
import Wrapper from "../../common/Wrapper";
import CreateSpamHotline from "./CreateCampaign";
const { Search } = Input;

export default function Campaign() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTxt, setSearchTxt] = useState("");
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([])

  const COLUMN_CONFIG = [
    {
      dataIndex: 'name',
      key: 'name',
      title: 'Tên khách hàng',
    },
    {
      dataIndex: 'hotline',
      key: 'hotline',
      title: 'Hotline',
    },
    {
      dataIndex: 'note',
      key: 'note',
      title: 'Mô tả',
    },
    {
      key: 'action',
      title: 'Hành động',
      render: (_, record) => {
        const showDeleteConfirm = () => {
          confirm({
            title: 'Xóa bản ghi?',
            icon: <WarningTwoTone twoToneColor="#ff4d4f" />,
            content: 'Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa bản ghi này?',
            okText: 'OK',
            okType: 'danger',
            cancelText: 'Hủy bỏ',
            onOk() {
              handleDelte(record.id)
            },
            onCancel() {},
          });
        };
        return (
          <Button type="primary" icon={<DeleteOutlined />} danger shape="round" onClick={showDeleteConfirm}/>
        )
      }
    },
  ];

  const handleDelte = async (id) => {
    setLoading(true);
    await SpamAPI.deleteSpamHotline(id);
    setLoading(false);
  }
   
  const getListData = useCallback(async () => {
    setLoading(true);
    const response = await SpamAPI.getAllSpamList();
    const convertResponse = response.data.hotline?.map((item, index) => ({...item, key: index}))
    setLoading(false);
    setTotal(convertResponse?.length);
    setData(convertResponse);
    setSearchData(convertResponse)
  }, []);
  
  useEffect(() => {
    getListData();
  }, [getListData]);

  const handlePageChange = (value) => {
    setLoading(true);
    setPage(value);
  };

  const handleSearch = (value) => {
    const searchValue = value?.toLowerCase().trim();
    if (searchValue !== searchTxt) {
      const searchData = data.filter(item => item?.hotline.includes(searchValue))
      setSearchData(searchData)
      setTotal(searchData.length)
      setPage(1);
      setSearchTxt(searchValue);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

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
          dataSource={searchData}
          columns={COLUMN_CONFIG}
          pagination={false}
          loading={loading}
          scroll={{ x: "max-content" }}
          className='antd-table'
        />
         <Pagination
            style={{ float: "right", marginTop: 10 }}
          //pageSize={10}
         // total={total}
         // current={page}
         // onChange={handlePageChange}
        />
      </Card>
    </Wrapper>
  );
}
