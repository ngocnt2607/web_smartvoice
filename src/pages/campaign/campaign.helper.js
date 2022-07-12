export function getDataByParams (params,data) {
    const returnData = [];
    const pageSize = params.pageSize ? params.pageSize : 10;
    const totalResult = data.filter((element) =>
      element.campaign_name.includes(params.search)
    );
    const result = 
    {
      data:  totalResult,
      total: totalResult.length,
    };
    

    return result;
  }
