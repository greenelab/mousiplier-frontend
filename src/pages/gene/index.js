import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import SectionHeader from '../../components/section-header';
import Details from '../../components/details';
import Alert from '../../components/alert';
import { getGeneDetails } from '../../actions/genes.js';
import { isObject } from '../../util/types.js';
import { isString } from '../../util/types.js';

import './index.css';

let Gene = ({ match, details, getGeneDetails }) => {
  const id = match.params.id;

  useEffect(() => {
    getGeneDetails({ id: id });
  }, [id, getGeneDetails]);

  return (
    <>
      <Header justTitle />
      <Main>
        <SectionHeader text='Gene Details' />
        <section>
          {isObject(details) && <Details data={details} />}
          {isString(details) && (
            <Alert status={details} subject='gene details' />
          )}
        </section>
      </Main>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  details: state.gene.details
});

const mapDispatchToProps = (dispatch) => ({
  getGeneDetails: (...args) => dispatch(getGeneDetails(...args))
});

Gene = withRouter(Gene);
Gene = connect(mapStateToProps, mapDispatchToProps)(Gene);

export default Gene;