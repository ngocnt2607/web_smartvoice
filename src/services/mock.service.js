class MockServiceClass {
  campaignList = []

  constructor() {
    
  }

  
  
  
  getData (params) {
    const returnData = [];
    const pageSize = params.pageSize ? params.pageSize : 10;

    const totalResult = this.campaignList.filter((element) =>
      element.name.includes(params.search)
    );
    for (
      let i = (params.page - 1) * pageSize;
      i < params.page * pageSize;
      i++
    ) {
      returnData.push(totalResult[i]);
    }
    const result = 
    {
      data:  returnData,
      total: totalResult.length,
    };
    

    return result;
  }

  addData (name, audioFile, startDate, endDate) {
    this.campaignList.push({
      id: this.campaignList.length,
      name,
      audioFile,
      startDate,
      endDate,
      status: 0,
    })
  }
};

const MockServe = new MockServiceClass()

export default MockServe;
