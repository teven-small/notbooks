import React from 'react';
import {
  Button,
  Spin,
  PageHeader,
  Pagination,
  Badge
} from 'antd'
function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize);
}
function App() {
  return (
    <div>
      <Button loading type="primary">测试一下</Button>
      <Spin>
        <div>
          以上是在 create-react-app 中使用 antd 的相关实践，你也可以借鉴此文的做法在自己的
          webpack 工作流中使用 antd，更多 webpack 配置可参考 atool-build。（例如加入
          moment noParse 避免加载所有语言文件）
      </div>
      </Spin>
      <PageHeader onBack={() => null} title="Title" subTitle="This is a subtitle" />
      <Pagination
        defaultCurrent={6}
        total={500}
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        showQuickJumper />
      <Badge count={500}><span>Badge</span></Badge>
    </div>
  );
}

export default App;
