// @flow strict
import React from 'react';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';

const Search = () => {
  const { title, subtitle } = useSiteMetadata();
  console.log(this)
  return (
    <Layout title={`Search - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="NOT FOUND">
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Page>
    </Layout>
  );
};

export default Search;
