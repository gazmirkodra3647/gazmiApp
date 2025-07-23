import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Tabs from './tabs.component';
import Tab from './tab/tab.component';

describe('Tabs', () => {
  const renderTabs = (props = {}) => {
    const defaultProps = {
      defaultActiveTabKey: '',
      onTabClick: () => null,
      tabsClassName: '',
      subHeader: null,
    };

    return render(
      <Tabs {...defaultProps} {...props}>
        <Tab tabKey="tab1" name="Tab 1">
          Tab 1 Content
        </Tab>
        <Tab tabKey="tab2" name="Tab 2">
          Tab 2 Content
        </Tab>
      </Tabs>,
    );
  };

  it('renders the tabs component', () => {
    const { getByText } = renderTabs();
    expect(getByText('Tab 1')).toBeInTheDocument();
    expect(getByText('Tab 2')).toBeInTheDocument();
    expect(getByText('Tab 1 Content')).toBeInTheDocument();
  });

  it('switches tabs when clicked', () => {
    const { getByText, queryByText } = renderTabs();
    fireEvent.click(getByText('Tab 2'));
    expect(queryByText('.Tab.+Content')).not.toBeInTheDocument();
    expect(getByText(/^.*Content$/)).toBeInTheDocument(); // Matches either "Table .+Content"
});
