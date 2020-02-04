import React, { PureComponent } from "react";
import styled from "styled-components";
import { AppState } from "../../store/rootReducer";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setCurrentUser } from "./actions";

type THomeProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class Home extends PureComponent<THomeProps> {
  componentDidMount() {
    console.log(this.props.currentUser);
  }

  render() {
    return (
      <Grid>
        <div>Home</div>
        <div>
          <button>Logout</button>
        </div>
      </Grid>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  currentUser: state.home.currentUser
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setCurrentUser
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const Grid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr auto;
  position: absolute;
  width: 100%;
  height: 100%;
`;
