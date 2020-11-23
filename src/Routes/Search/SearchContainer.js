import React from "react";
import { withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { useQuery } from "react-apollo-hooks";
import { SEARCH_QUERY } from "./SearchQueries";
export default withRouter(({ location: { search } }) => {
  const searchTerm = decodeURI(search.split("=")[1]);
  const { data, loading } = useQuery(SEARCH_QUERY, {
    skip: searchTerm === undefined,
    // if skip is true, skip  this query
    variables: {
      term: searchTerm,
    },
  });
  return (
    <SearchPresenter searchTerm={searchTerm} loading={loading} data={data} />
  );
});
