import React from "react";

interface SearchTabContentProps {
  type: string;
}

const searchUsersTable = () => {
  return <div>searchUsersTable</div>;
};

const searchRolesTable = () => {
  return <div>searchRolesTabTable</div>;
};

const renderTabContent = (type: string) => {};

const SearchTabContent: React.FC<SearchTabContentProps> = ({ type }) => {
  return <div>SearchTabContent</div>;
};

export default SearchTabContent;
