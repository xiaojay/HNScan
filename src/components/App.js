import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, useTheme, ApiConfig } from "@urkellabs/ucl";

// Special
import ScrollToTop from "components/shared/ScrollToTop";

// Components
import Navigation from "components/layout/Navigation";
import Footer from "components/layout/Footer";
import ContentContainer from "components/layout/ContentContainer";

// Main Pages
import Address from "screens/Address";
import Block from "screens/Block";
import Blocks from "screens/Blocks";
import Home from "screens/Home";
import Name from "screens/Name";
import Names from "screens/Names";
import Search from "screens/Search";
import Settings from "screens/Settings";
import Transaction from "screens/Transaction";

// More Pages
import AirdropClaimScreen from "screens/tools/AirdropClaim/AirdropClaimScreen";

// Tool Pages
import NodeStatus from "screens/tools/NodeStatus";
import Peers from "screens/tools/Peers";
import Charts from "screens/tools/Charts";
import Changelog from "screens/Changelog";

// Error Pages
import NotFoundScreen from "screens/errors/NotFound";
import NetworkBoundary from "screens/errors/NetworkBoundary";

// Internationalization
import "../i18n/i18n";

// Hooks
import useNetwork from "hooks/useNetwork";

function App() {
  const [theme] = useTheme();
  const [network] = useNetwork();
  return (
    <ThemeProvider theme={theme}>
      <ApiConfig config={{ url: network }}>
        <>
          <GlobalStyles />
          <Router>
            <ScrollToTop />
            <NetworkBoundary>
              <Navigation />
              <ContentContainer>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/address/:hash" exact component={Address} />
                  <Route path="/blocks" exact component={Blocks} />
                  <Route path="/block/:height" exact component={Block} />
                  <Route path="/names" exact component={Names} />
                  <Route path="/name/:name" exact component={Name} />
                  <Route path="/settings" exact component={Settings} />
                  {/* Ideally let's get a recent transactions page going */}
                  <Route path="/tx/:hash" exact component={Transaction} />
                  <Route path="/search" exact component={Search} />
                  {/* More Screens */}
                  {/* Tool Screens */}
                  <Route path="/peers" exact component={Peers} />
                  <Route path="/status" exact component={NodeStatus} />
                  <Route path="/charts" component={Charts} />
                  <Route path="/changelog" exact component={Changelog} />
                  <Route
                    path="/airdropclaim"
                    exact
                    component={AirdropClaimScreen}
                  />
                  <Route path="*" component={NotFoundScreen} />
                </Switch>
              </ContentContainer>
              <Footer />
            </NetworkBoundary>
          </Router>
        </>
      </ApiConfig>
    </ThemeProvider>
  );
}

export default App;
