import React from 'react';
import { Card } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import DealStorageFunnelChart from './DealStorageFunnelChart';
import Flex from 'components/common/Flex';

const DealStorageFunnel = () => {
  return (
    <Card>
      <FalconCardHeader
        title="Company Wise Active buoys"
        titleTag="h6"
        className="border-200 border-bottom py-2"
      />
      <Card.Body dir="ltr">
        <Flex
          justifyContent="between"
          alignItems="center"
          className="rtl-row-reverse"
        >
          <h6 className="fs--2 text-500 flex-1">Company Name</h6>
          <h6 className="fs--2 text-500 mx-2">Active Buoys </h6>
          <h6 className="fs--2 text-500">Activity</h6>
        </Flex>
        <DealStorageFunnelChart />
      </Card.Body>
    </Card>
  );
};

export default DealStorageFunnel;