import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CampaignIndex from "./pages/index";
import CampaignShow from "./pages/campaigns/show";
import CampaignNew from "./pages/campaigns/new";
import RequestIndex from "./pages/campaigns/requests/index";
import RequestNew from "./pages/campaigns/requests/new";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/campaigns/new">
            <CampaignNew />
          </Route>
          <Route path="/campaigns/:address/requests">
            <RequestIndex />
          </Route>
          <Route path="/campaigns/:address/newrequest">
            <RequestNew />
          </Route>
          <Route path="/campaigns/:address">
            <CampaignShow />
          </Route>
          <Route path="/">
            <CampaignIndex />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
