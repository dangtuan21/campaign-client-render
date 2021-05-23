import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

class CampaignIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { campaigns: [] };
    this.getCampaigns();
  }
  async getCampaigns() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    this.setState({ campaigns: campaigns });
  }
  renderCampaigns() {
    const { campaigns } = this.state;
    console.log("campaigns", campaigns.length);
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: <Link to={`/campaigns/${address}`}>View Campaign</Link>,
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }
  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>
          <Link to="/campaigns/new">
            <Button
              floated="right"
              content="Create Campaign"
              icon="add circle"
              primary
            />
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
