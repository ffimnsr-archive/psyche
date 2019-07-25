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

export interface IRegisterProps {}

export interface IRegisterState {}

class Register extends React.PureComponent<IRegisterProps, IRegisterState> {
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
              <FormGroup
                label="Password"
                labelFor="password"
              >
                <InputGroup
                  id="password"
                  placeholder="Enter your password..."
                  large={true}
                />
              </FormGroup>
              <FormGroup
                label="Confirm Password"
                labelFor="confirm-password"
              >
                <InputGroup
                  id="confirm-password"
                  placeholder="Re-type your password..."
                  large={true}
                />
              </FormGroup>
              <FormGroup>
                <Switch
                  label="I agree to the Terms and Conditions."
                  defaultChecked={false}
                />
                <Switch
                  label="Opt-in to notifications and promotions."
                  defaultChecked={false}
                />
              </FormGroup>
              <FormGroup>
                <Button
                  intent={Intent.PRIMARY}
                  large={true}
                >
                  Register
                </Button>
              </FormGroup>
            </form>
          </ContainerForm>
        </ContainerSidePane>
      </Container>
    );
  }
}

export default Register;
