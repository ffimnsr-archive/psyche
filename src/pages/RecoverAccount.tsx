import * as React from "react";
import styled from "styled-components";
import {
  Button,
  Intent,
  FormGroup,
  Switch,
  InputGroup
} from "@blueprintjs/core";

import bgPattern from "@/assets/images/pattern.svg";

const Container = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
`;

const ContainerDesign = styled.div`
  flex: 1 1 auto;
  background-size: auto !important;
  background-color: #434959;
  background-image: url(${bgPattern});
`;

const ContainerSidePane = styled.div`
  flex: 0.2 0 auto;
  display: flex;
  flex-direction: row;
`;

const ContainerForm = styled.div`
  flex: 1 1 auto;
  align-self: center;
  padding: 0 2em;
`;

export interface IRecoverAccountProps {}

export interface IRecoverAccountState {}

class RecoverAccount extends React.PureComponent<IRecoverAccountProps, IRecoverAccountState> {
  render() {
    return (
      <Container>
        <ContainerDesign />
        <ContainerSidePane>
          <ContainerForm>
            <form>
              <FormGroup
                label="Email"
                labelFor="email"
              >
                <InputGroup
                  id="email"
                  placeholder="Enter your email..."
                  large={true}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Button
                  intent={Intent.PRIMARY}
                  large={true}
                >
                  Recover Account
                </Button>
              </FormGroup>
            </form>
          </ContainerForm>
        </ContainerSidePane>
      </Container>
    );
  }
}

export default RecoverAccount;
