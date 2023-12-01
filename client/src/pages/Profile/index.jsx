import React from 'react'
import { Tabs } from 'antd';
import Products from './Products';
const Profile = () => {
  return (
    <div>
      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab="Product" key="1">
          <Products></Products>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bids" key="2">
          <h1>Bids</h1>
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="3">
          <h1>General</h1>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default Profile;