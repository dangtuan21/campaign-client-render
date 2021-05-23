import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class RequestIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      requests: [],
      requestCount: "",
      approversCount: "",
    };
  }
  componentDidMount() {
    const address = this.props.match.params.address;
    this.getRequests(address);
  }

  async getRequests(address) {
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );

    this.setState({
      address,
      requests,
      requestCount,
      approversCount,
    });
  }

  renderRows() {
    return this.state.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.state.address}
          approversCount={this.state.approversCount}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <h3>Requests</h3>
        <Link to={`/campaigns/${this.state.address}/newrequest`}>
          <Button primary floated="right" style={{ marginBottom: 10 }}>
            Add Request
          </Button>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.state.requestCount} requests.</div>
      </Layout>
    );
  }
}

export default withRouter(RequestIndex);
