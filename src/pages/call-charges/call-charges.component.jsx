import { Card, DatePicker, Pagination, Table } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import SmartVoiceAPI from '../../api/call-charges.api';
import Wrapper from '../../common/Wrapper';
import { COLUMN_CONFIG } from './table.config';
import {convertDateByFormat} from '../../helper/convert-date.helper'
import dayjs from "dayjs";


export default function SmartVoice() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentMonth, setCurrentMonth] = useState();
  

  const getListData = useCallback(async (month) => {
    setLoading(true);
    const response = await SmartVoiceAPI.getAllSmartVoiceList(month);
    console.log(response);
    setLoading(false);
    setData(response?.data?.users?.map((item) => {
      const number = item?.['Noi mang'];
      const number1 = item?.['Ngoai mang di dong'];
      const number2 = item?.['Cước sub'];
      const number3 = item?.['Ngoai mang co dinh'];
      const number4 = item?.['noi hat'];
      const number5 = item?.['Tổng theo ngày'];
      const nf = new Intl.NumberFormat('en-US');
      console.log(item)
         return ({
         ...item,
         'Noi mang': nf.format(number),
         'Ngoai mang di dong': nf.format(number1),
         'Cước sub': nf.format(number2),
         'Ngoai mang co dinh': nf.format(number3),
         'noi hat': nf.format(number4),
         'Tổng theo ngày': nf.format(number5)
         })
        }));
    setTotal(response.data?.users?.length);
  }, []);
  
  useEffect(() => {
    const convertMonth = convertDateByFormat(Date.now(), 'YYYY/MM').replace("/", "");
    setCurrentMonth(convertDateByFormat(Date.now(), 'YYYY/MM').split("/")[1])
    getListData(convertMonth);
    
  }, [getListData]);

  const handlePageChange = (value) => {
    setLoading(true);
    setPage(value);
  };
  
  const onChange = (m, monthYearString) => {
    const value = monthYearString.replace("/", "");
    setCurrentMonth(monthYearString.split("/")[1])
    getListData(value)
  }

  return (
    <Wrapper>
      <Card>
        <h1>Cước SmartSip của tháng: {currentMonth}</h1>
        <DatePicker size="large" onChange={onChange} picker="month" defaultValue={dayjs()} format ='YYYY/MM' />
        <Table
          dataSource={data}
          columns={COLUMN_CONFIG}
          pagination={false}
          loading={loading}
          scroll={{ x: 'max-content' }}
          className='antd-table'
        />
        <Pagination
        //  style={{ float: 'right', marginTop: 10 }}
        //  pageSize={10}
        //  total={total}
         // current={page}
         // onChange={handlePageChange}
        />
      </Card>
    </Wrapper>
  );
}
