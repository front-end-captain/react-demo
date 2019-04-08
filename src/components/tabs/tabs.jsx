import React from "react";
import { TabBar } from "antd-mobile";

import {
  InsertImageIcon,
  TemplateIcon,
  DecorateIcon,
  TextIcon,
  LayerIcon,
} from "./../icon/icon.jsx";

import TabsWrapper from "./tab.css.js";

const { Item: TabBarItem } = TabBar;

class Tabs extends React.Component {
  state = {
    selectedKey: 1,
  };

  setSelectedKey = (key) => {
    this.setState({ selectedKey: key });
  };

  render() {
    const { selectedKey } = this.state;
    return (
      <TabsWrapper>
        <TabBar>
          <TabBarItem
            key="1"
            title="图片"
            icon={<InsertImageIcon />}
            selectedIcon={<InsertImageIcon />}
            selected={selectedKey === 1}
            onPress={() => this.setSelectedKey(1)}
          >
            上传图片
          </TabBarItem>
          <TabBarItem
            key="2"
            title="模板"
            icon={<TemplateIcon />}
            selectedIcon={<TemplateIcon />}
            selected={selectedKey === 2}
            onPress={() => this.setSelectedKey(2)}
          >
            模板
          </TabBarItem>
          <TabBarItem
            key="3"
            title="装饰"
            icon={<DecorateIcon />}
            selectedIcon={<DecorateIcon />}
            selected={selectedKey === 3}
            onPress={() => this.setSelectedKey(3)}
          >
            装饰
          </TabBarItem>
          <TabBarItem
            key="4"
            title="文字"
            icon={<TextIcon />}
            selectedIcon={<TextIcon />}
            selected={selectedKey === 4}
            onPress={() => this.setSelectedKey(4)}
          >
            文字
          </TabBarItem>
          <TabBarItem
            key="5"
            title="图层"
            icon={<LayerIcon />}
            selectedIcon={<LayerIcon />}
            selected={selectedKey === 5}
            onPress={() => this.setSelectedKey(5)}
          >
            图层
          </TabBarItem>
        </TabBar>
      </TabsWrapper>
    );
  }
}

export default Tabs;
