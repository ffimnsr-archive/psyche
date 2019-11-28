import { ActionType } from "typesafe-actions";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "@/actions";
import Register, { IStateProps, IDispatchProps } from "./Register";

type Action = ActionType<typeof actions>;

const mapStateToProps = (): IStateProps => ({});

const mapDispatchToProps = (dispatch: Dispatch<Action>): IDispatchProps =>
	bindActionCreators(
		{
			signUp: (email: string, password: string) => actions.sesameSignUp(email, password)
		},
		dispatch
	);

export default connect<IStateProps, IDispatchProps>(
	mapStateToProps,
	mapDispatchToProps
)(Register);
