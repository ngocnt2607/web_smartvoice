import { Card, Pagination, Table } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import SmartVoiceAPI from '../../api/call-charges.api';
import Wrapper from '../../common/Wrapper';
import { COLUMN_CONFIG } from './table.config';

export default function SmartVoice() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const getListData = useCallback(async () => {
    setLoading(true);
    const response = await SmartVoiceAPI.getAllSmartVoiceList();
    console.log(response);
    setLoading(false);
    setData(response.data?.users);
    setTotal(response.data?.users?.length);
  }, []);

  useEffect(() => {
    getListData();
  }, [getListData]);

  const handlePageChange = (value) => {
    setLoading(true);
    setPage(value);
  };

  return (
    <Wrapper>
      <Card>
        <Table
          dataSource={data}
          columns={COLUMN_CONFIG}
          pagination={false}
          loading={loading}
          scroll={{ x: 'max-content' }}
        />
        <Pagination
          style={{ float: 'right', marginTop: 10 }}
          pageSize={10}
          total={total}
          current={page}
          onChange={handlePageChange}
        />
      </Card>
    </Wrapper>
  );
}
