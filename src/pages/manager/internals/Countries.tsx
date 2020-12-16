import React from "react";
import log from "loglevel";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { HTMLTable, H5, Card, Elevation } from "@blueprintjs/core";
import { Sidebar, NavigationHeader } from "@/components";
import { Country } from "@/models/internals";
import { useQuery, gql } from "@apollo/client";

const COUNTRIES_QUERY = gql`
  query _countries {
    country {
      countries {
        id
        name
        description
      }
    }
  }
`;

const Container = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
`;

const ContainerMain = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: stretch;
`;

const ContainerCountries = styled.div`
  flex: 1 1 auto;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
`;

const ResponsiveTable = styled(HTMLTable)`
  width: 100%;
`;

function CountryList({ list }: { list: Country[] }): JSX.Element {
  const countries = list.map(
    ({ id, name, alpha2, alpha3, phoneCode, currencyCode }: Country) => (
      <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{alpha2}</td>
        <td>{alpha3}</td>
        <td>{phoneCode}</td>
        <td>{currencyCode}</td>
        <td></td>
      </tr>
    ),
  );

  return (
    <>
      <Card elevation={Elevation.ONE}>
        <H5>COUNTRIES</H5>
        <ResponsiveTable condensed={true} striped={true}>
          <tbody>{countries}</tbody>
        </ResponsiveTable>
      </Card>
    </>
  );
}

function CountriesContent(): JSX.Element {
  const { loading, error, data } = useQuery(COUNTRIES_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) {
    log.error(error);
    return <p>Error</p>;
  }

  log.info();
  return (
    <ContainerCountries>
      <CountryList list={data.country.countries} />
    </ContainerCountries>
  );
}

function Countries(): JSX.Element {
  return (
    <Container>
      <Helmet titleTemplate="%s | Open Sesame">
        <title>Countries</title>
      </Helmet>
      <Sidebar />
      <ContainerMain>
        <NavigationHeader />
        <CountriesContent />
      </ContainerMain>
    </Container>
  );
}

export default Countries;
