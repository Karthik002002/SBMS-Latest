import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import React, { useState } from 'react';
import { recentLeadsTableData } from 'data/dashboard/crm';
import { Card } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import CardDropdown from 'components/common/CardDropdown';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import { Link } from 'react-router-dom';
import Flex from 'components/common/Flex';
import Avatar from '../../../components/common/Avatar';
import SoftBadge from 'components/common/SoftBadge';
import IconItem from 'components/common/icon/IconItem';
import Sidebar from './Sidebar';

const StatusTabs = () => {
  const columns = [
    {
      accessor: 'name',
      //   Header: 'Name',
      headerProps: {
        className: 'py-3 ps-0'
      },
      cellProps: {
        className: 'ps-0'
      },
      Cell: rowData => {
        return (
          <Link to="#!" className="text-800">
            <Flex alignItems="center">
              <Avatar size="xl" src={rowData.row.original.img} />
              <h6 className="mb-0 ps-2">{rowData.row.original.name}</h6>
            </Flex>
          </Link>
        );
      }
    },
    {
      accessor: 'email',
      Header: 'Email and Phone',
      Cell: rowData => {
        return (
          <a href={`mailto:${rowData.row.original.email}`} className="mb-0">
            {rowData.row.original.email}
          </a>
        );
      }
    },
    {
      accessor: 'status',
      Header: 'Status',
      Cell: rowData => {
        return (
          <SoftBadge pill bg={rowData.row.original.variant} className="me-2">
            {rowData.row.original.status}
          </SoftBadge>
        );
      }
    },
    {
      accessor: 'Action',
      Header: 'Action',
      headerProps: {
        className: 'text-end'
      },
      cellProps: {
        className: 'text-end'
      },
      disableSortBy: true,
      Cell: () => (
        <div>
          <div className="hover-actions bg-100">
            <IconItem
              tag="button"
              icon={['far', 'edit']}
              size="sm"
              className="btn rounded-3 me-2 fs--2"
            />
            <IconItem
              tag="button"
              icon={['far', 'comment']}
              size="sm"
              className="btn rounded-3 me-2 fs--2"
            />
          </div>
          <CardDropdown btnRevealClass="btn-reveal-sm" drop="start" />
        </div>
      )
    }
  ];
  return (
    <div className="tabs">
      <Tabs>
        <Tab label="♐">
          <div>
            {/* <Sidebar /> */}
            <p>Tab 1 content</p>
          </div>
        </Tab>
        <Tab label="Tab 2">
          <div>
            <p>Tab 2 content</p>
          </div>
        </Tab>
        <Tab label="Tab 3">
          <div>
            <p>Tab 3 content</p>
          </div>
        </Tab>
        <Tab label="Tab 4">
          <div>
            <p>Tab 4 content</p>
          </div>
        </Tab>
        <Tab label="Tab 5">
          <div>
            <p>Tab 5 content</p>
          </div>
        </Tab>
      </Tabs>
      <AdvanceTableWrapper
        columns={columns}
        data={recentLeadsTableData}
        selection
        selectionColumnWidth={28}
        sortable
        pagination
        perPage={10}
      >
        <Card>
          <FalconCardHeader
            title="Recent Leads"
            titleTag="h6"
            className="py-2"
            endEl={<CardDropdown />}
          />
          <Card.Body className="p-0">
            <AdvanceTable
              table
              headerClassName="bg-200 text-900 text-nowrap align-middle"
              rowClassName="align-middle white-space-nowrap hover-actions-trigger btn-reveal-trigger hover-bg-100"
              tableProps={{
                className: 'fs--1 mb-0 overflow-hidden'
              }}
            />
          </Card.Body>
        </Card>
      </AdvanceTableWrapper>
    </div>
  );
};

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const changeTab = tab => {
    setActiveTab(tab);
  };

  let content;
  let buttons = [];

  React.Children.forEach(children, child => {
    buttons.push(child.props.label);
    if (child.props.label === activeTab) content = child.props.children;
  });

  return (
    <div>
      <TabButtons
        activeTab={activeTab}
        buttons={buttons}
        changeTab={changeTab}
      />
      <div className="tab-content">{content}</div>
    </div>
  );
};

const TabButtons = ({ buttons, changeTab, activeTab }) => {
  return (
    <div className="tab-buttons">
      {buttons.map(button => (
        <button
          key={button}
          className={button === activeTab ? 'active' : ''}
          onClick={() => changeTab(button)}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

const Tab = props => {
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default StatusTabs;
